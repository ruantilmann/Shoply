import dotenv from 'dotenv'

const env = process.env

export default {
    dialect: env.DIALECT,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}