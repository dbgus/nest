export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    type: 'mysql',
  },
  jwt: process.env.JWT_KEY,
});
