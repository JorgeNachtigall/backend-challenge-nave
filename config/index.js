const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'nave'
    }
});

module.exports = knex;