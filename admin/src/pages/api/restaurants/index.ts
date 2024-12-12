import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
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
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
