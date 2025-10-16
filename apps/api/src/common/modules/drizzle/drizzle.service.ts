import { Inject, Injectable } from '@nestjs/common';
import { schema } from '@ys/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PG_CONNECTION } from './drizzle.provider';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(PG_CONNECTION) readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
