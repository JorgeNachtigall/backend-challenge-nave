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

            return res.json({ error: { message: 'Candidate not found.' } });
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
            const data = await database.select().from('vagascandidato').where('cpfcandidato', req.params.cpf);

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ error: { message: "Candidate didn't apply for any vacancies." } });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async setCandidateToVacancy(req, res) {
        try {
            const candidate = await database.select('cpf').from('candidato').where('cpf', req.params.cpf);
            const vacancy = await database.select('codigovaga').from('vagas').where('codigovaga', req.params.vacancyCode);

            if (!candidate[0] || !vacancy[0]) {
                return res.json({ error: { message: 'candidate_or_vacancy_not_registered' } });
            }

            const insertData = {
                cpfcandidato: candidate[0]['cpf'],
                codigovaga: vacancy[0]['codigovaga']
            };

            const candidateApply = await database.insert(insertData).returning('*').into('vagascandidato');

            return res.json({ data: candidateApply[0] });

        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    }
}