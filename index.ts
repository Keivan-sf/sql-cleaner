#!/usr/bin/env node
import { config } from "dotenv";
config();
import db from "./utils/mysql.js";
import { $, $err, $success, $exit , greet } from "./utils/styles.js";

$(greet());

(async () => {
    const connection = await db.connect().catch((err) => {
        $exit("Error connecting to database: ", err);
    });

    $success("Connected to database");

    const tableResults = await db.query(`SHOW TABLES`).catch((err) => {
        $exit("Error reading tables from database: ", err);
    });

    const tables = tableResults.map((table: any) => Object.values(table)[0]);

    console.log(tables);

    await db.end();

    $success("Disconnected from database");
})();
