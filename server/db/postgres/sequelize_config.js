module.exports = {
  development: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'bill_split_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'bill_split_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'bill_split_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
