import dotenv from "dotenv"
dotenv.config()

const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL || "mongodb://localhost:27017/books",
        origin: ['http://localhost:5173','http://localhost:4173']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL || "mongodb://localhost:27017/books",
        origin: []
    }
};
export default config[env]
