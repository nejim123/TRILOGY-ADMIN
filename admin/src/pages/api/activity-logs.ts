import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [logs] = await pool.execute(`
      SELECT 
        al.*,
        r.name as restaurant_name
      FROM activity_logs al
      LEFT JOIN restaurants r ON al.restaurant_id = r.id
      ORDER BY al.created_at DESC
      LIMIT 100
    `);

    return res.status(200).json(logs);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
}
