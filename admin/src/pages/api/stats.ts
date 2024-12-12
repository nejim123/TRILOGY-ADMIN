import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [[totalRestaurants]] = await pool.execute(
      'SELECT COUNT(*) as count FROM restaurants'
    );
    
    const [[activeUsers]] = await pool.execute(
      'SELECT COUNT(*) as count FROM restaurants WHERE active = true'
    );
    
    const [[failedAttempts]] = await pool.execute(
      'SELECT COUNT(*) as count FROM access_logs WHERE status = "denied" AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)'
    );

    return res.status(200).json({
      totalRestaurants: totalRestaurants.count,
      activeUsers: activeUsers.count,
      totalApiKeys: totalRestaurants.count,
      failedAttempts: failedAttempts.count
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to fetch statistics' });
  }
}
