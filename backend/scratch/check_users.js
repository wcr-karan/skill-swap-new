const prisma = require("../src/prisma");

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users in DB:", users.map(u => ({ id: u.id, email: u.email, name: u.name })));
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
