import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import pool from '@/lib/db';
import { generateApiKey } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM restaurants ORDER BY created_at DESC'
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;
    const apiKey = generateApiKey();

    try {
      await pool.execute(
        'INSERT INTO restaurants (name, email, api_key, active) VALUES (?, ?, ?, true)',
        [name, email, apiKey]
      );
      return res.status(201).json({ message: 'Restaurant created' });
    } catch (error) {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
