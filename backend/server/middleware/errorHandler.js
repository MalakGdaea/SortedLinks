const ApiError = require('../errors/ApiError');

const isProd = process.env.NODE_ENV === 'production';

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    let status = 500;
    let message = 'Something went wrong';

    // Log the actual error for debugging
    console.log('Error:', err);

    if (err instanceof ApiError) {
        // ApiError messages are safe to send to client
        status = err.statusCode || 500;
        message = err.message || message;
    } else if (err.name === 'ValidationError') {
        status = 400;
        message = 'Invalid input provided';
    } else if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID format';
    } else if (err.name === 'MongoNetworkError' || err.name === 'MongoError') {
        status = 500;
        message = 'Something went wrong'; // Hide database errors
    } else if (err.message && err.message.includes('bufferng timed out')) {
        status = 503;
        message = 'Service temporarily unavailable';
    } else {
        // For any other unexpected error, always use generic message
        status = 500;
        message = 'Something went wrong';
    }

    const payload = { message };

    // Only include stack trace in development
    if (!isProd) {
        payload.stack = err.stack;
        payload.actualError = err.message; // For debugging
    }

    res.status(status).json(payload);
}

module.exports = errorHandler;