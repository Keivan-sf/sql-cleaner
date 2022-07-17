import * as mysql2 from "mysql2";

class DB_CONNECTION {
    private static sqlConnection: mysql2.Connection;

    private static createConnection = (
        URI: string
    ): Promise<mysql2.Connection> =>
        new Promise((resolve, reject) => {
            const connection = mysql2.createConnection(URI);
            connection.connect((err) => {
                if (err) {
                    reject(err);
                }
                resolve(connection);
            });
        });

    static async connect(URI: string) {
        DB_CONNECTION.sqlConnection = await DB_CONNECTION.createConnection(URI);
        return DB_CONNECTION.sqlConnection;
    }

    static end = (): Promise<mysql2.Connection> => {
        if (!DB_CONNECTION.sqlConnection)
            throw new Error("No connection to close");
        return new Promise((resolve, reject) => {
            DB_CONNECTION.sqlConnection.end((err) => {
                if (err) {
                    reject(err);
                }
                resolve(DB_CONNECTION.sqlConnection);
            });
        });
    };

    static query = (query: string): Promise<any> =>
        new Promise((resolve, reject) => {
            DB_CONNECTION.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });

    static get connection() {
        if (!DB_CONNECTION.sqlConnection)
            throw new Error("Connection to database has not been established");
        return DB_CONNECTION.sqlConnection;
    }
}

export default DB_CONNECTION;
