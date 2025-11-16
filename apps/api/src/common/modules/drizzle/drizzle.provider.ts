import { Provider } from '@nestjs/common';
import { schema } from '@ys/shared';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { ConfigService } from '../config/config.service';
export const PG_CONNECTION = 'PG_CONNECTION';

export const DrizzleProvider: Provider = {
  provide: PG_CONNECTION,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.db.DB_URL;
    console.log(connectionString, 'connectionString');
    const pool = new Pool({ connectionString });

    return drizzle(pool, {
      schema,
      logger: true,
      casing: 'snake_case',
    }) as NodePgDatabase<typeof schema>;
  },
};
