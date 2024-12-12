const { logger } = require('../utils/logger');

exports.validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    logger.warn('API key missing from request');
    return res.status(401).json({
      status: 'error',
      message: 'API key is required'
    });
  }

  if (!apiKey.startsWith('trg_')) {
    logger.warn('Invalid API key format:', apiKey);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid API key format'
    });
  }

  next();
};
