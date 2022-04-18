import DBC from "./connection.js";
import * as mysql2 from "mysql2";

class DB_TRANSACTIONS {
    static beginTransaction = (): Promise<mysql2.Connection> =>
        new Promise((resolve, reject) => {
            DBC.connection.beginTransaction((err) => {
                if (err) return reject(err);
                resolve(DBC.connection);
            });
        });

    static commit = (): Promise<mysql2.Connection> =>
        new Promise((resolve, reject) => {
            DBC.connection.commit((err) => {
                if (err) return reject(err);
                resolve(DBC.connection);
            });
        });

    static rollback = (): Promise<mysql2.Connection> =>
        new Promise((resolve) => {
            DBC.connection.rollback(() => {
                resolve(DBC.connection);
            });
        });
}

export default DB_TRANSACTIONS;