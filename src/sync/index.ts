require('dotenv').config();

import { PrismaClient } from '@prisma/client';
import { BlockSynchronizer } from './block';

export const prisma = new PrismaClient();

new BlockSynchronizer({}).run();
