const pg = require('pg');

const connection = new pg.Pool({
    user: 'jepgixox',
    password: 'uCiyEOEcoMg5fpTsntPOq4AwrIcy18Jb',
    host: 'john.db.elephantsql.com',
    database: 'jepgixox',
    max: 5,
});

module.exports = connection;