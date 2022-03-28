import * as mysql2 from "mysql2";

export const connectToDB = (URI: string): Promise<mysql2.Connection> =>
    new Promise((resolve, reject) => {
        const connection = mysql2.createConnection(URI);
        connection.connect((err) => {
            if (err) {
                reject(err);
            }
            resolve(connection);
        });
    });
