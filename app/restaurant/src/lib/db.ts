// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$connect();

export default prisma;
