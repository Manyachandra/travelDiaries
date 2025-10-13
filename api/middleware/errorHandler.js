// Structured error response format
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  
  return res.status(statusCode).json(response);
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return errorResponse(res, 400, 'Validation failed', errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return errorResponse(res, 400, `${field} already exists`);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return errorResponse(res, 400, 'Invalid ID format');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 403, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 403, 'Token expired');
  }

  // Default to 500 server error
  return errorResponse(
    res,
    err.statusCode || 500,
    err.message || 'Internal server error'
  );
};

// Async handler wrapper to catch errors in async routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, errorResponse, asyncHandler };

