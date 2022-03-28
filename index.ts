#!/usr/bin/env node
import { config } from "dotenv";
config();
const DB = process.env.DATABASE_URL ?? "mysql://root:@localhost/test";
import * as mysql2 from "mysql2";
import chalk from "chalk";
import boxen from "boxen";
import { connectToDB } from "./utils/mysql.js";
const $ = console.log;

const greet = () => {
    const welcomeMessage =
        chalk.green("Welcome! ") +
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
    .then((connection: mysql2.Connection) => {
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
