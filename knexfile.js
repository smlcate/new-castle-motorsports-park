module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'ncmp'
    }
  },

  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
