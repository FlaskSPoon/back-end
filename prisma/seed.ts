import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hasher le mot de passe pour l'utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Créer ou mettre à jour les rôles ADMIN et USER
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' }, 
    update: {}, 
    create: { name: 'ADMIN' }, 
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {}, 
    create: { name: 'USER' }, 
  });

  // Créer ou mettre à jour l'utilisateur admin avec le rôle ADMIN
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' }, 
    update: {}, 
    create: {
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: {
        connect: { id: adminRole.id }, 
      },
    },
  });

  console.log('Seeding terminé avec succès ✅');
  console.log({ adminRole, userRole, adminUser }); 
}

main()
  .catch((e) => {
    console.error('Erreur lors du seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Fermer la connexion Prisma
  });