import { Cache } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { schema } from '@ys/shared';
import { eq } from 'drizzle-orm';

import { DrizzleService } from '@/common/modules/drizzle/drizzle.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly cache: Cache,
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const KEY = `user:${id}`;
    const cachedUser = await this.cache.get(KEY);
    console.log('cachedUser', cachedUser);
    if (cachedUser) {
      console.log('从缓存中获取用户信息');
      return { ...cachedUser, fromCache: true };
    }

    const [user] = await this.drizzle.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id));

    try {
      await this.cache.set(KEY, user);
    } catch (error) {
      console.error('缓存用户信息失败', error);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user, updateUserDto:${JSON.stringify(updateUserDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
