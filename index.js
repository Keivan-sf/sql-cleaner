#!/usr/bin/env node
var _a;
import { config } from "dotenv";
config();
const DB = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "mysql://root:@localhost/test";
import chalk from "chalk";
import boxen from "boxen";
import { connectToDB } from "./utils/mysql.js";
const $ = console.log;
const greet = () => {
    const welcomeMessage = chalk.green("Welcome! ") +
        chalk.red("sql-cleaner ") +
        chalk.yellowBright("v0.0.1");
    const welcomeBox = boxen(welcomeMessage, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
    });
    $(welcomeBox);
};
greet();
connectToDB(DB)
    .then((connection) => {
    $("Connected to database");
    connection.end((err) => {
        if (err) {
            $("Error closing connection");
        }
        $("Connection closed");
    });
})
    .catch((err) => {
    $("Error connecting to database");
    $(err);
});
