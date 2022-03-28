import * as mysql2 from "mysql2";
const DB = process.env.DATABASE_URL ?? "mysql://root:@localhost/test";
let connection: mysql2.Connection;

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

const connect = async () => {
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

const db = { connect, end };

export default db;
