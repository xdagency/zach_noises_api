// DB Connections
module.exports = {

    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host     : `${process.env.DB_HOST}`,
        user     : `${process.env.DB_USER}`,
        password : `${process.env.DB_PASSWORD}`,
        database : `${process.env.DB_NAME}`,
    },
  
    development: {
      client: 'pg',
      connection: `${process.env.DB_PATH}`,
      migrations: {
        directory: './migrations'
      },
    },
    
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './migrations'
      }
    }
  
  };
  