#!/usr/bin/env node
import { config } from "dotenv";
config();
import chalk from "chalk";
import boxen from "boxen";
import db from "./utils/mysql.js";
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

(async () => {

    const connection = await db.connect().catch(err => {
        $("Error connecting to database: ", err);
        process.exit(1);
    });

    $(chalk.green("✓ Connected to database"));

    await db.end();

    $(chalk.green("✓ Disconnected from database"));

})()

