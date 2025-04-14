import Database from 'better-sqlite3';

const db = new Database('JuanGPTLogs.db');
db.pragma('journal_mode = WAL');
const prepareThreadsTableStmt = db.prepare(`
        CREATE TABLE IF NOT EXISTS runs (
            threadId TEXT,
            runId TEXT,
            timestamp TEXT,
            prompt TEXT,
            response TEXT,
            FOREIGN KEY(threadId) REFERENCES threads(threadId)
        );
    `);
const prepareRunsTableStmt = db.prepare(`        
        CREATE TABLE IF NOT EXISTS threads (
            threadId TEXT PRIMARY KEY,
            timestamp TEXT
        );
    `);
prepareThreadsTableStmt.run();
prepareRunsTableStmt.run();

