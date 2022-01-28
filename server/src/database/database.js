const pg = require('pg');
const fs = require('fs');
const path = require('path');

// user: 'jepgixox',
// password: 'uCiyEOEcoMg5fpTsntPOq4AwrIcy18Jb',
// host: 'john.db.elephantsql.com',
// database: 'jepgixox',
// max: 5,

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const connection = new pg.Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  max: 5,
});

module.exports = connection;
