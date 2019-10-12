const errorCodes = require('pg-error-codes');
const database = require('../config');

module.exports = {
    async getAll(req, res) {
        try {
            const data = await database.select().from('admin');
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

    async getAdmin(req, res) {
        try {
            const data = await database.select().from('admin').where('usuario', req.params.user);
            return res.json({ data: data[0] });
        } catch (error) {
            return res.json({
                'error': {
                    code: error['code'],
                    message: errorCodes[error['code']]
                }
            })

        }
    },

    async create(req, res) {
        try {
            const data = await database.insert(req.body).returning('*').into('admin');
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

    async setCandidateToVacancy(req, res) {
        try {
            const candidate = await database.select('cpf').from('candidato').where('cpf', req.params.cpf);
            const vacancy = await database.select('codigoVaga').from('vagas').where('codigoVaga', req.params.vacancyCode);

            if (!candidate || !vacancy)
                return res.json({
                    error: {
                        message: 'candidate_or_vacancy_not_registered'
                    }
                });

            const candidateApply = await database.insert({
                cpfcandidato: candidate[0]['cpf'],
                codigovaga: vacancy[0]['codigoVaga']
            }).returning('*').into('vagascandidato');

            return res.json({ data: candidateApply[0] });

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