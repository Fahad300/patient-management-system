import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const sqlFile = path.join(process.cwd(), 'prisma', 'seed.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(`${statement};`);
  }

  console.log('Demo data seeded successfully');
}

main()
  .catch(e => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 