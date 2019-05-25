// DB Connections

module.exports = {

    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : 'postgres',
        database : 'zach_noises',
        charset  : 'utf8'
    },
  
    development: {
      client: 'pg',
      connection:'postgres://localhost/zach_noises',
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
  