// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   const hashedPassword = await bcrypt.hash('admin123', 10);

//   await prisma.user.upsert({
//     where: { email: 'admin@admin.com' },
//     update: {},
//     create: {
//       username: 'admin',
//       email: 'admin@admin.com',
//       password: hashedPassword,
//       role: 'ADMIN',
//     },
//   });

//   console.log('🌱 Base de données initialisée avec un admin !');
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
