"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlExecuter = void 0;
var pg_promise_1 = __importDefault(require("pg-promise"));
var pgp = (0, pg_promise_1.default)({});
var config = {
    db: {
        // 設定項目: https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
        host: process.env.DATABASE_HOST,
        port: 5432,
        database: "postgres",
        // message: "message",
        // user: "user",
        user: "postgres",
        password: "password",
        max: 10,
        query_timeout: 60000 // 60sec
    }
};
exports.sqlExecuter = pgp(config.db);
