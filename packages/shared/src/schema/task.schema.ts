import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'

import { timestamps } from './global'

export const task = pgTable('task', {
  id: serial().primaryKey(),

  title: varchar().notNull(),
  description: varchar(),
  done: boolean().notNull().default(false),

  ...timestamps,
})

export const TaskSelectSchema = createSelectSchema(task)
export type TaskSelect = typeof task.$inferSelect
export const TaskInsertSchema = createInsertSchema(task)
export type TaskInsert = typeof task.$inferInsert
export const TaskUpdateSchema = createUpdateSchema(task)
export type TaskUpdate = Partial<TaskInsert>
