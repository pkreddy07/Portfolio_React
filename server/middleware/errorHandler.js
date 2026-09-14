export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled server error:', err.message || err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: message,
  });
};
