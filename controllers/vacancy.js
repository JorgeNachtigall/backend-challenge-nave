const errorCodes = require('pg-error-codes');
const database = require('../config');

module.exports = {
    async getAll(req, res) {
        try {
            const data = await database.select().from('vagas');
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

    async getVacancy(req, res) {
        try {
            const data = await database.select().from('vagas').where('codigoVaga', req.params.vacancyCode);
            return res.json({ data: data[0] });
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
            const data = await database.insert(req.body).returning('*').into('vagas');
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