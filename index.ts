#!/usr/bin/env node
import chalk from "chalk";
import { config } from "dotenv";
config();
import { $, $exit, $warn, greet } from "./utils/libs/styles.js";
import { program } from "commander";
import { cleanTables } from "./utils/cleanTables.js";
import { CleanTablesOptions } from "./interfaces/mysql.js";

program.option(
    "-e, --exception <string...>",
    "ignore one/multiple tables while deleting data"
);

program.parse();

const options = program.opts();

let programOpts: CleanTablesOptions = { ignore: options.exception ?? [] };

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

cleanTables(DB, programOpts);
