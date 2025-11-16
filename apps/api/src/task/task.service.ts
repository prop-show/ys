import { Injectable } from '@nestjs/common';
import { schema } from '@ys/shared';
import { eq } from 'drizzle-orm';

import { DrizzleService } from '@/common/modules/drizzle/drizzle.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createTaskDto: CreateTaskDto) {
    const [result] = await this.drizzle.db
      .insert(schema.task)
      .values(createTaskDto)
      .returning();

    return result;
  }

  async findAll() {
    const result = await this.drizzle.db.select().from(schema.task);

    return result;
  }

  async findOne(id: number) {
    const [result] = await this.drizzle.db
      .select()
      .from(schema.task)
      .where(eq(schema.task.id, id));

    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const [result] = await this.drizzle.db
      .update(schema.task)
      .set(updateTaskDto)
      .where(eq(schema.task.id, id))
      .returning();

    return result;
  }

  async remove(id: number) {
    const [result] = await this.drizzle.db
      .delete(schema.task)
      .where(eq(schema.task.id, id))
      .returning();

    return result;
  }
}
