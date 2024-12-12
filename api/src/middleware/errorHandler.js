const { logger } = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};
