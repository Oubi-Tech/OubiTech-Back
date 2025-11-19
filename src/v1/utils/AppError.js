/**
 * This AppError class will be used all over the back-end to return
 * http response messages.
 */
class AppError extends Error {
    constructor(message, statusCode, customMessages) {
        // Pass the message to the built-in Error class
        super(message);

        // Set the HTTP status code
        this.statusCode = statusCode;

        // Set a status property based on the status code
        this.status = `${String(statusCode).startsWith(4) ? 'rejected' : 'accepted'}`

        // This helps distinguish these from programming bugs
        this.isOperational = true;

        // This for any custom messages.
        this.customMessages = customMessages || {};

        // Capture the stack trace, excluding this constructor
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
