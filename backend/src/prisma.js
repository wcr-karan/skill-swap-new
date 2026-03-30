const { PrismaClient } = require("@prisma/client");
const path = require("path");
const Database = require("better-sqlite3");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const dbPath = path.join(__dirname, "../dev.db");

// Fallback for Render if ENV is missing
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
