#!/usr/bin/env node
import chalk from "chalk";
import { config } from "dotenv";
config();
import { $, $warn, greet } from "./utils/libs/styles.js";
import { program } from "commander";
import { cleanTables } from "./utils/cleanTables.js";
import { CleanTablesOptions } from "./interfaces/mysql.js";

program.option("-e, --exception <string...>" , "ignore one/multiple tables while deleting data").parse();
const options = program.opts();

let programOpts: CleanTablesOptions = {ignore: options.exception ?? []};

console.log(programOpts);

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