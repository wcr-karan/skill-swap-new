const { PrismaClient } = require("@prisma/client");
const path = require("path");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: `file:${path.join(__dirname, "../dev.db")}`,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
