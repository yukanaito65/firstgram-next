// import pgPromise from "pg-promise";
const { Pool } = require("pg");

// const pgp = pgPromise({});
// const pool = {
// 	db: {
// 		// 設定項目: https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
// 		host: "127.0.0.1",
// 		port: 5432,
// 		database: "db",
// 		// message: "message",
// 		// user: "user",
//     user: "postgres",
//     password: "password",
// 		max: 10, // size of the connection pool
// 		query_timeout: 60000 // 60sec
// 	}
// };

const pool = new Pool({
    host: '127.0.0.1',
    database: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'password'
});

module.exports = pool;

// export const sqlExecuter = pgp(config.db);
