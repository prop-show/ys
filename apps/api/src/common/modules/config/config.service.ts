import type { ConfigType } from '@nestjs/config';

import { Inject, Injectable } from '@nestjs/common';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(appConfig.KEY) public readonly app: ConfigType<typeof appConfig>,
    @Inject(dbConfig.KEY) public readonly db: ConfigType<typeof dbConfig>,
    @Inject(jwtConfig.KEY) public readonly jwt: ConfigType<typeof jwtConfig>,
  ) {}
}
