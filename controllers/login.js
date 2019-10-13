const database = require('../config');
const jwt = require('jsonwebtoken');
const pgErrors = require('../utils/pgErrors');

module.exports = {
    async login(req, res) {
        try {
            const data = await database.select().from('admin').where('usuario', req.body.user);

            const userName = data[0]['usuario'];
            const userPassword = data[0]['senha']

            if (userName === req.body.user && userPassword === req.body.password) {
                const payload = userName;
                const token = jwt.sign({ payload }, process.env.SECRET, { expiresIn: 1200 });

                const authData = {
                    'data': {
                        'auth': true,
                        'token': token
                    }
                }

                return res.json(authData);
            }

            const authFailed = {
                'error': {
                    code: "401",
                    message: "wrong_password"
                }
            }

            return res.json(authFailed);
        } catch (error) {
            return res.json({ error: { message: "User not found" } });
        }
    }
}