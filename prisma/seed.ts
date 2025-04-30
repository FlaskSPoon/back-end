import { PrismaClient, ROLE } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      status: 'Approved',
      role: ROLE.ROLE_ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@user.com' },
    update: {},
    create: {
      username: 'user',
      email: 'user@user.com',
      password: hashedPassword,
      status: 'Approved',
      role: ROLE.ROLE_USER,
    },
  });


}

main()
  .catch((e) => {
    console.error('Erreur lors du seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
