import { prisma } from "./src/config/prisma.js";

async function main() {
  await prisma.role.createMany({
    data: [
      { name: "ADMIN" },
      { name: "USER" }
    ],
    
  });

  console.log("Roles seeded");
}
main();