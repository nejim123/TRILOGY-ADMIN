import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['x-api-key'];
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM restaurants WHERE api_key = ? AND active = true',
      [apiKey]
    );

    const restaurant = rows[0];
    if (!restaurant) {
      await pool.execute(
        'INSERT INTO access_logs (api_key, ip_address, status) VALUES (?, ?, ?)',
        [apiKey, clientIp, 'denied']
      );
      return res.status(401).json({ error: 'Invalid or inactive API key' });
    }

    await pool.execute(
      'UPDATE restaurants SET last_active = NOW() WHERE id = ?',
      [restaurant.id]
    );

    await pool.execute(
      'INSERT INTO access_logs (restaurant_id, api_key, ip_address, status) VALUES (?, ?, ?, ?)',
      [restaurant.id, apiKey, clientIp, 'granted']
    );

    return res.status(200).json({ 
      access: true,
      restaurantId: restaurant.id,
      name: restaurant.name
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
