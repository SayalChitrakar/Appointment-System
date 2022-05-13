class AppError extends Error {

    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode  || 500;
        this.status = 'failed';
        this.isOperational = true;
    }
}

module.exports = AppError;