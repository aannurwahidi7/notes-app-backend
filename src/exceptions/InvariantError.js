const ClientError = require('./ClientError');

class InvariatError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvariatError';
    }
}

module.exports = InvariatError;
