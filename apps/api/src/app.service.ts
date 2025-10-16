import { Injectable } from '@nestjs/common';
import { schema } from '@ys/shared';

import { DrizzleService } from './common/modules/drizzle/drizzle.service';

@Injectable()
export class AppService {
  constructor(private readonly drizzle: DrizzleService) {}

  async getHello() {
    const user = await this.drizzle.db.select().from(schema.user);
    return user;
  }
}
