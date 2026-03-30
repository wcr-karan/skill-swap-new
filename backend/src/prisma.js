const { PrismaClient } = require("@prisma/client");
const path = require("path");
const Database = require("better-sqlite3");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

// Ensure the path is correct
const dbPath = path.join(__dirname, "../dev.db");
const sqlite = new Database(dbPath);

const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
