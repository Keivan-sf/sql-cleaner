#!/usr/bin/env node
import { config } from "dotenv";
config();
import db from "./utils/mysql.js";
import { $, $err, $success, $exit, $warn, greet } from "./utils/styles.js";

$(greet());

(async () => {
    const connection = await db.connect().catch((err) => {
        $exit("Error connecting to database: ", err);
    });

    $success("Connected to database");

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
        await db.rollback();
        await db.end();
        $exit("Error deleting data from tables: ", err);
    }

    await db.commit();

    await db.end();

    $success("Disconnected from database");
})();
