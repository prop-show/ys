import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { schema } from '@ys/shared';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/common/modules/config/config.service';
import { DrizzleService } from '@/common/modules/drizzle/drizzle.service';
import { excludeFields } from '@/common/utils/excluse-fields';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly drizzle: DrizzleService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const [user] = await this.drizzle.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, payload.sub));

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return excludeFields(user, 'password');
  }
}
