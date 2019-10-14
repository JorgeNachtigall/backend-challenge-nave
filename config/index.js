const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        database: process.env.DATABASE
    }
});

module.exports = knex;