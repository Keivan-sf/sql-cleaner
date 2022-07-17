import db from "./libs/mysql/index.js";
import { $, $success, $exit, $warn, greet } from "./libs/styles.js";
import { disconnectAndExit } from "./libs/errors.js";
import { CleanTablesOptions } from "../interfaces/mysql.js";
import chalk from "chalk";

export const cleanTables = async (DB: string, options: CleanTablesOptions) => {
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
    checkExceptions(tables , options.ignore);

    await db.beginTransaction().catch((err) => {
        $exit("Error starting transaction: ", err);
    });

    try {
        await db.deleteFromTables(tables , options);
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

    $success("Deleted all data from tables");

    await db.end();

    $success("Disconnected from database");
};

const checkExceptions = (tables: string[], exceptions: string[]) => {
    exceptions.forEach((name) => {
        if (!tables.some((t) => t === name))
            $exit(`The table ${chalk.white(`"${name}"`)} couldn't be found in the database`);
    });
};
