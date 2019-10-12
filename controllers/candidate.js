const errorCodes = require('pg-error-codes');
const database = require('../config');

module.exports = {
    async getAll(req, res) {
        try {
            const data = await database.select().from('candidato');
            return res.json({ data: data });
        } catch (error) {
            return res.json({
                'error': {
                    code: error['code'],
                    message: errorCodes[error['code']]
                }
            });
        }
    },

    async getCandidate(req, res) {
        try {
            const data = await database.select().from('candidato').where('cpf', req.params.cpf);
            return res.json({ data: data[0] })
        } catch (error) {
            return res.json({
                'error': {
                    code: error['code'],
                    message: errorCodes[error['code']]
                }
            });
        }
    },

    async create(req, res) {
        try {
            const data = await database.insert(req.body).returning('*').into('candidato');
            return res.json({ data: data[0] });
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