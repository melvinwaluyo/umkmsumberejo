import { PrismaClient } from '@prisma/client';

// Mencegah multiple instance dari Prisma Client di mode development
let db;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  // 'global' tidak terpengaruh oleh hot-reloading di Next.js
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export default db;