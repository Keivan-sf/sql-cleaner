#!/usr/bin/env node
import chalk from "chalk";
import { config } from "dotenv";
config();
import db from "./utils/mysql/index.js";
import { $, $success, $exit, $warn, greet } from "./utils/styles.js";
import { disconnectAndExit } from "./utils/errors.js";

$(greet());

let DB: string = process.env.DATABASE_URL as string;

if (!process.env.DATABASE_URL) {
    DB = "mysql://root:@localhost/test";
    $warn(
        `Environment variable ${chalk.white(
            "DATABASE_URL"
        )} was not found \n> Using default connection URL: ${chalk.white(
            `${DB}`
        )}`
    );
}

(async () => {
    await db.connect(DB).catch((err) => {
        $exit("Error connecting to database: ", err);
    });

    $success("Connected to database");

    await db.variables("autocommit", "0").catch((err) => {
        $exit("Error Setting 'autocommit' to 'OFF': ", err);
    });

    await db.variables("FOREIGN_KEY_CHECKS", "0").catch((err) => {
        $exit("Error Setting 'FOREIGN_KEY_CHECKS' to 'OFF': ", err);
    });

    const tables = (await db.readAllTables().catch((err) => {
        $exit("Error reading tables from database: ", err);
    })) as string[];

    $success("Read all the tables from database");

    await db.beginTransaction().catch((err) => {
        $exit("Error starting transaction: ", err);
    });

    try {
        await db.deleteFromTables(tables);
    } catch (err) {
        await disconnectAndExit(
            ["Error deleting data from tables: ", err],
            true
        );
    }

    await db.commit().catch(async (err) => {
        await disconnectAndExit(
            ["Error deleting data from tables: ", err],
            true
        );
    });

    await db.end();

    $success("Disconnected from database");
})();
