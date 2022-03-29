import * as mysql2 from "mysql2";
let connection: mysql2.Connection;
interface CleanTablesOptions {
    ignore?: string[];
}

const defaultIgnore = ["_prisma_migrations"];

const createConnection = (URI: string): Promise<mysql2.Connection> =>
    new Promise((resolve, reject) => {
        const connection = mysql2.createConnection(URI);
        connection.connect((err) => {
            if (err) {
                reject(err);
            }
            resolve(connection);
        });
    });

const connect = async (DB: string) => {
    connection = await createConnection(DB);
    return connection;
};

const end = (): Promise<mysql2.Connection> =>
    new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                reject(err);
            }
            resolve(connection);
        });
    });

const query = (query: string): Promise<any> =>
    new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });

const beginTransaction = (): Promise<mysql2.Connection> =>
    new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) return reject(err);
            resolve(connection);
        });
    });

const commit = (): Promise<mysql2.Connection> =>
    new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err) return reject(err);
            resolve(connection);
        });
    });

const rollback = (): Promise<mysql2.Connection> =>
    new Promise((resolve) => {
        connection.rollback(() => {
            resolve(connection);
        });
    });

const readAllTables = async (): Promise<string[]> => {
    const results = await query(`SHOW TABLES`);
    return results.map((table: any) => Object.values(table)[0]);
};

const deleteFromTables = async (
    tables: string[],
    options: CleanTablesOptions = {}
): Promise<string[]> => {
    options.ignore = options?.ignore || [];
    options.ignore.push(...defaultIgnore);
    for (const table of tables) {
        if (options.ignore.includes(table)) {
            continue;
        }
        await query(`DELETE FROM ${table}`);
    }
    return tables;
};

const db = {
    connect,
    end,
    query,
    readAllTables,
    deleteFromTables,
    beginTransaction,
    commit,
    rollback,
};

export default db;
