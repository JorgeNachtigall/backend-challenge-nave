const database = require('../config');
const pgErrors = require('../utils/pgErrors');

module.exports = {
    async showAll(req, res) {
        try {
            const data = await database.select().from('candidato');

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showCandidate(req, res) {
        try {
            const data = await database.select().from('candidato').where('cpf', req.params.cpf);

            if (data.length > 0)
                return res.json({ data: data[0] });

            return res.json({ error: { code: 404, message: 'Candidate not found.' } });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async create(req, res) {
        try {
            const data = await database.insert(req.body).returning('*').into('candidato');
            return res.json({ data: data[0] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showCandidaturesOfCandidate(req, res) {
        try {
            const data = await database.select().from('vagascandidato').where('cpf_candidato', req.params.cpf);

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async setCandidateToVacancy(req, res) {
        try {
            const candidate = await database.select('cpf').from('candidato').where('cpf', req.params.cpf);
            const vacancy = await database.select('codigo_vaga').from('vagas').where('codigo_vaga', req.params.vacancyCode);

            if (!candidate[0] || !vacancy[0]) {
                return res.json({ error: { code: 404, message: 'Candidate or vacancy not registered' } });
            }

            const insertData = {
                cpf_candidato: candidate[0]['cpf'],
                codigo_vaga: vacancy[0]['codigo_vaga']
            };

            const candidateApply = await database.insert(insertData).returning('*').into('vagascandidato');

            return res.json({ data: candidateApply[0] });

        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    }
}