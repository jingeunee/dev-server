import 'dotenv/config';

export default () => ({
  database: {
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
    connectString: process.env.DATABASE_CONNECT_STRING || '',
    // host: process.env.DATABASE_HOST || '',
    // name: process.env.DATABASE_NAME || '',
    // port: process.env.DATABASE_PORT || '',
  },
});
