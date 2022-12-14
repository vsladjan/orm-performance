import config from "./config.json";

export default {
    entities: ['./models/mikroorm/entities/**/*.js'],
        debug: false,
        dbName:  'orm',
        type: 'mysql',
        user: config.db_username,
        password: config.db_password
};