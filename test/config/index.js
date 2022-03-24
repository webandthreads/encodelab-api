module.exports = {
  knex: {
    client: 'mysql',
    migrations: {
      directory: `${__dirname}../../../knex/migrations`,
    },
    connection: {
      database: 'encodelab_test',
      host: 'localhost',
      password: 'password123',
      port: 3307,
      user: 'encodelab_user',
    },
  },
  webServer: {
    port: 1338,
  },
  smtp: {
    host: 'mail.svenskadomaner.se',
    port: 2525,
    auth: {
       user: 'contact@another-closet.com',
       pass: '_x%L!WOS+t)B'
    },
  },
};
