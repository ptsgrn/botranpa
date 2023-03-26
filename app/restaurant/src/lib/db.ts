// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$connect();

export default prisma;
