
const logger = console.log;

const databases = {
  sqlite: {
    development: {
      dialect: 'sqlite',
      storage: '../database/leads2b.db',
      define: { charset: 'utf8', timestamps: true },
      logging: logger,
    }
  }
};

module.exports = databases;
