#!/usr/bin/env node
import { config } from "dotenv";
config();
import db from "./utils/mysql.js";
import { $, $err, $success, $exit, greet } from "./utils/styles.js";

$(greet());

(async () => {
    const connection = await db.connect().catch((err) => {
        $exit("Error connecting to database: ", err);
    });

    $success("Connected to database");

    const tables = await db.readAllTables().catch((err) => {
        $exit("Error reading tables from database: ", err);
    });

    $success("Read all the tables from database");

    await db.end();

    $success("Disconnected from database");
})();
