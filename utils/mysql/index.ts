import DB_CONNECTION from "./connection.js";
import DB_TABLES from "./tables.js";
import DB_TRANSACTIONS from "./transactions.js";

const db = {
    connect: DB_CONNECTION.connect,
    end: DB_CONNECTION.end,
    beginTransaction: DB_TRANSACTIONS.beginTransaction,
    commit: DB_TRANSACTIONS.commit,
    rollback: DB_TRANSACTIONS.rollback,
    readAllTables: DB_TABLES.readAllTables,
    deleteFromTables: DB_TABLES.deleteFromTables,
};

export default db;
