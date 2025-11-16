import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'

import { timestamps } from './global'

export const user = pgTable('user', {
  id: serial().primaryKey(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),

  ...timestamps,
})

export const UserSelectSchema = createSelectSchema(user)
export type UserSelect = typeof user.$inferSelect
export const UserInsertSchema = createInsertSchema(user)
export type UserInsert = typeof user.$inferInsert
export const UserUpdateSchema = createUpdateSchema(user)
export type UserUpdate = Partial<UserInsert>
