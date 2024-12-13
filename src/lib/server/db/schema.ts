import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	role: text('role').default('reader')
});

export const list = sqliteTable('list', {
	id: integer('id').primaryKey(),
})

export const task = sqliteTable('task', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	done: integer('done').default(0).notNull(),
	listId: integer('list_id').references(() => list.id)
})

export const listRelation = relations(list, ({many}) => ({
	tasks: many(task)
}))