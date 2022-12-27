import pgPromise from "pg-promise";

const pgp = pgPromise({});
const config = {
	db: {
		// 設定項目: https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
		host: process.env.DATABASE_HOST,
		port: 5432,
		database: "postgres",
		// message: "message",
		// user: "user",
    user: "postgres",
    password: "password",
		max: 10, // size of the connection pool
		query_timeout: 60000 // 60sec
	}
};

export const sqlExecuter = pgp(config.db);
