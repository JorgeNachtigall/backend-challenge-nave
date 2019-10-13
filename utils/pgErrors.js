// postgres errors messages 
const errorCodes = require('pg-error-codes');

module.exports = {
    info(errorCode) {
        errorInfo = {
            'error': {
                code: errorCode['code'],
                message: errorCodes[errorCode['code']]
            }
        }

        return errorInfo;
    }
}