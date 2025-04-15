import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('logs/JuanGPTLogs.db');
let dbInstance = null;

function initializeDatabase() {
    if (dbInstance) return dbInstance;

    try {
        console.log(`Initializing database at: ${dbPath}`);
        const db = new Database(dbPath);
        db.pragma('journal_mode = WAL');

        console.log('Creating tables `threads` and `runs`.');

        // Statement 1: Create 'threads' table FIRST
        const createThreadsTableStmt = db.prepare(`
            CREATE TABLE IF NOT EXISTS threads
            (
                threadId  TEXT PRIMARY KEY,
                timestamp TEXT
            );
        `);

        // Statement 2: Create 'runs' table SECOND
        const createRunsTableStmt = db.prepare(`
            CREATE TABLE IF NOT EXISTS runs
            (
                threadId  TEXT,
                runId     TEXT,
                timestamp TEXT,
                prompt    TEXT,
                response  TEXT,
                FOREIGN KEY (threadId) REFERENCES threads (threadId)
            );
        `);

        // Execute table creation in correct order
        createThreadsTableStmt.run();
        createRunsTableStmt.run();

        console.log('Database tables checked/created successfully.');
        dbInstance = db;
        return dbInstance

    } catch (error) {
        console.error(`Failed to initialize database: ${error}`);
        dbInstance = null;
        throw new Error(`Database initialization failed: ${error.message}`);
    }
}

export function getDB() {
    if (!dbInstance) {
        console.log("Database instance not found, attempting initialization...");
        initializeDatabase();
    }
    if (!dbInstance) {
        throw new InitialiseDatabaseError();
    }
    return dbInstance;
}

class InitialiseDatabaseError extends Error {
    constructor() {
        super("Database could not be initialised.")
    }
}
