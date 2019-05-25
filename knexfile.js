// DB Connections
const config = require('./config');

module.exports = {

    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host     : config.DB_HOST,
        user     : config.DB_USER,
        password : config.DB_PASSWORD,
        database : config.DB_NAME,
        charset  : 'utf8'
    },
  
    development: {
      client: 'pg',
      connection: config.DB_PATH,
      migrations: {
        directory: './migrations'
      },
    },
    
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: __dirname + 'migrations'
      }
    }
  
  };
  