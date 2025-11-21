export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;

  const response = {
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  res.status(status).json(response);
};
