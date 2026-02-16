const prisma = require("./src/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function main() {
    console.log("--- Starting Reproduction Script ---");

    // 1. List all users to see if DB is accessible and populated
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users.`);
    users.forEach(u => console.log(` - ${u.email} (ID: ${u.id})`));

    const testEmail = "test@example.com";
    const testPassword = "password123";

    // 2. Create or Reset Test User
    let user = await prisma.user.findUnique({ where: { email: testEmail } });
    if (user) {
        console.log(`User ${testEmail} exists. Deleting to reset...`);
        // We need to delete related records first if any (skills, requests)
        // For now, let's just update password
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        user = await prisma.user.update({
            where: { email: testEmail },
            data: { password: hashedPassword }
        });
        console.log(`User ${testEmail} password reset to '${testPassword}'.`);
    } else {
        console.log(`Creating user ${testEmail}...`);
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        user = await prisma.user.create({
            data: {
                name: "Test User",
                email: testEmail,
                password: hashedPassword
            }
        });
        console.log(`User ${testEmail} created.`);
    }

    // 3. Simulate Login
    console.log("--- Simulating Login ---");
    const loginUser = await prisma.user.findUnique({ where: { email: testEmail } });
    if (!loginUser) {
        console.error("Login failed: User not found.");
        return;
    }

    const isMatch = await bcrypt.compare(testPassword, loginUser.password);
    console.log(`Password match for '${testPassword}': ${isMatch}`);

    if (isMatch) {
        const token = jwt.sign({ userId: loginUser.id }, "supersecretkey", { expiresIn: "7d" });
        console.log("Login successful. Token generated:", token ? "YES" : "NO");
    } else {
        console.error("Login failed: Password mismatch.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
