const prisma = require("../src/prisma");
const bcrypt = require("bcrypt");

async function main() {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
    if (!user) {
      console.log("User test@example.com not found");
      return;
    }
    const isMatch = await bcrypt.compare('test123', user.password);
    console.log("Password 'test123' matches hash for test@example.com:", isMatch);
    console.log("Hash in DB:", user.password);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
