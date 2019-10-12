const errorCodes = require('pg-error-codes');
const database = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        try {
            const data = await database.select().from('admin').where('usuario', req.body.user);

            if (data[0]['usuario'] === req.body.user && data[0]['senha'] === req.body.password) {
                const payload = data[0]['nome'];
                const token = jwt.sign({ payload }, process.env.SECRET, {
                    expiresIn: 600
                });

                return res.json({
                    'data': {
                        'auth': true,
                        'token': token
                    }
                });
            }

            return res.json({
                'error': {
                    code: "401",
                    message: "wrong_password"
                }
            });
        } catch (error) {
            return res.json({
                'error': {
                    code: error['code'],
                    message: errorCodes[error['code']]
                }
            });
        }
    }
}