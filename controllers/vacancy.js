const database = require('../config');
const pgErrors = require('../utils/pgErrors');

module.exports = {
    async showAll(req, res) {
        try {
            const data = await database.select().from('vagas');

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] })
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showVacancy(req, res) {
        try {
            const data = await database.select().from('vagas').where('codigo_vaga', req.params.vacancyCode);
            if (data.length > 0)
                return res.json({ data: data[0] });

            return res.json({ error: { error: 404, message: 'Vacancy not found.' } });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async create(req, res) {
        try {
            const data = await database.insert(req.body).returning('*').into('vagas');
            return res.json({ data: data[0] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showVacancyCandidatures(req, res) {
        try {
            const data = await database.select().from('vagascandidato').where('codigo_vaga', req.params.vacancyCode);
            if (data.length > 0)
                return res.json({ data: data });
            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    }
}