import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { active } = req.body;

  try {
    await pool.execute(
      'UPDATE restaurants SET active = ? WHERE id = ?',
      [active, id]
    );

    await pool.execute(
      'INSERT INTO activity_logs (restaurant_id, action, performed_by) VALUES (?, ?, ?)',
      [id, active ? 'activated' : 'deactivated', session.user.email]
    );

    return res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
}
