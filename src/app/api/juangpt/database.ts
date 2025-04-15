import Database from 'better-sqlite3';
import {getDB} from './dbSetup.mjs';

const db = getDB()
db.pragma('journal_mode = WAL');

const insertThreadStmt = db.prepare(`
    INSERT INTO threads (threadId, timestamp)
    VALUES (?, ?)
    ON CONFLICT(threadId) DO NOTHING
`);

const insertRunStmt = db.prepare(`
    INSERT INTO runs (threadId, runId, timestamp, prompt, response)
    VALUES (?, ?, ?, ?, ?)
`);

export function logRun(threadId: string, runId: string, prompt: string, response: string): void {
    try {
        const isoDate = new Date().toISOString();
        insertThreadStmt.run(threadId, isoDate);
        insertRunStmt.run(threadId, runId, isoDate, prompt, response);
    } catch (e) {
        console.error(`There was an error logging run to SQLITE/n ${e}`)
    }
}