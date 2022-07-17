import DBC from "./connection.js";
import { CleanTablesOptions } from "../../../interfaces/mysql.js";
const defaultIgnore = ["_prisma_migrations"];

class DB_TABLES {
    static readAllTables = async (): Promise<string[]> => {
        const results = await DBC.query(`SHOW TABLES`);
        return results.map((table: any) => Object.values(table)[0]);
    };

    static deleteFromTables = async (
        tables: string[],
        options: CleanTablesOptions = {ignore: []}
    ): Promise<string[]> => {
        options.ignore = options?.ignore ?? [];
        options.ignore.push(...defaultIgnore);
        for (const table of tables) {
            if (options.ignore.includes(table)) {
                continue;
            }
            await DBC.query(`DELETE FROM ${table}`);
        }
        return tables;
    };
}

export default DB_TABLES;
