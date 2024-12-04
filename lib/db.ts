import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull(),
  date: text('date').notNull()
});

export type SelectTask = typeof tasks.$inferSelect;
export const insertTaskSchema = createInsertSchema(tasks);

export async function getTasks(
  search: string,
  offset: number
): Promise<{
  tasks: SelectTask[];
  newOffset: number | null;
  totalTasks: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      tasks: await db
        .select()
        .from(tasks)
        .where(ilike(tasks.title, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalTasks: 0
    };
  }

  if (offset === null) {
    return { tasks: [], newOffset: null, totalTasks: 0 };
  }

  let totalTasks = await db.select({ count: count() }).from(tasks);
  let moreTasks = await db.select().from(tasks).limit(5).offset(offset);
  let newOffset = moreTasks.length >= 5 ? offset + 5 : null;

  return {
    tasks: moreTasks,
    newOffset,
    totalTasks: totalTasks[0].count
  };
}

export async function getTask(id: number): Promise<SelectTask | null> {
  let task: any = await db.select().from(tasks).where(eq(tasks.id, id));
  return task[0] ?? null;
}

export async function createTaskBy(data: any) {
  await db.insert(tasks).values(data);
}

export async function updateTaskById(data: any, id: number) {
  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function deleteTaskById(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));
}
