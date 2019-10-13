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

            return res.json({ error: { message: 'User not found.' } });
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
                adminUsuario: req.user,
                comentario: req.body.comentario,
                idCandidatura: req.params.idCandidature
            };

            const data = await database.insert(insertData).returning('*').into('comentarios');

            return res.json({ data: data[0] });

        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showCandidatureCommentById(req, res) {
        try {
            const data = await database.select("adminUsuario", "comentario").from('comentarios').where('idCandidatura', req.params.idCandidature);

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ error: { message: "There's no comments for this candidature" } });
        } catch (error) {
            return res.json(pgErrors.info(error));
        }
    },

    async showAllCandidatures(req, res) {
        try {
            const data = await database.select().from('vagascandidato');

            if (data.length > 0)
                return res.json({ data: data });

            return res.json({ error: { message: "There's no candidatures." } });
        } catch (error) {
            return res.json(pgErros.info(error));
        }
    },
}