import type { z } from 'zod'

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
export type UserSelect = z.infer<typeof UserSelectSchema>
export const UserInsertSchema = createInsertSchema(user)
export type UserInsert = z.infer<typeof UserInsertSchema>
export const UserUpdateSchema = createUpdateSchema(user)
export type UserUpdate = z.infer<typeof UserUpdateSchema>
