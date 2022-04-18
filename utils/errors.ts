import db from "./mysql/index.js";
import { $exit } from "./styles.js";
export const disconnectAndExit = async (err: any[], rollback = false) => {
    if (rollback) {
        await db.rollback();
    }
    await db.end();
    $exit(...err);
};
