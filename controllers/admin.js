const database = require('../config');
const pgErrors = require('../utils/pgErrors');

module.exports = {
    async showAll(req, res) {
        try {
            const data = await database.select().from('admin');

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showAdmin(req, res) {
        try {
            const data = await database.select().from('admin').where('usuario', req.params.user);

            if (data.length > 0)
                return res.json({ data: data[0] });

            return res.json({ error: { code: 404, message: 'User not found.' } });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async create(req, res) {
        try {
            const data = await database.insert(req.body).returning('*').into('admin');
            return res.json({ data: data[0] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async comment(req, res) {
        try {

            const insertData = {
                admin_usuario: req.user,
                comentario: req.body.comentario,
                id_candidatura: req.params.idCandidature
            };

            const data = await database.insert(insertData).returning('*').into('comentarios');

            return res.json({ data: data[0] });

        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showCandidatureCommentById(req, res) {
        try {
            const candidature = await database.select('id_candidatura').from('vagascandidato').where('id_candidatura', req.params.idCandidature);
            const data = await database.select("admin_usuario", "comentario").from('comentarios').where('id_candidatura', req.params.idCandidature);

            if (candidature.length === 0)
                return res.json({ error: { code: 404, message: "This candidature doesn't exists." } })

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showAllCandidatures(req, res) {
        try {
            const data = await database.select().from('vagascandidato');

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ data: [] });
        } catch (error) {
            return res.json(pgErros.info(error));
        }
    },
}