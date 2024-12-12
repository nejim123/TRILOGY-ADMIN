const pool = require('../db');
const { logger } = require('../utils/logger');

exports.verifyAccess = async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const clientIp = req.ip;

  try {
    const [rows] = await pool.execute(
      'SELECT id, name, active FROM restaurants WHERE api_key = ?',
      [apiKey]
    );

    const restaurant = rows[0];

    if (!restaurant || !restaurant.active) {
      // Log failed attempt
      await pool.execute(
        'INSERT INTO access_logs (api_key, ip_address, status) VALUES (?, ?, ?)',
        [apiKey, clientIp, 'denied']
      );

      return res.status(401).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    // Log successful attempt
    await pool.execute(
      'INSERT INTO access_logs (restaurant_id, api_key, ip_address, status) VALUES (?, ?, ?, ?)',
      [restaurant.id, apiKey, clientIp, 'granted']
    );

    // Update last active timestamp
    await pool.execute(
      'UPDATE restaurants SET last_active = NOW() WHERE id = ?',
      [restaurant.id]
    );

    return res.json({
      status: 'success',
      access: true,
      restaurantId: restaurant.id,
      name: restaurant.name
    });
  } catch (error) {
    logger.error('Access verification error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
