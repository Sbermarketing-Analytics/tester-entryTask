import { Composer, rpc } from '@chord-ts/rpc';
import { sveltekitMiddleware } from '@chord-ts/rpc/middlewares';
import { json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

import { db } from '$lib/server/db/index.js';
import { list, task } from '$lib/server/db/schema.js';
import { takeUniqueOrThrow } from '$lib/server/db/utils';

class TODO {
	@rpc()
	async all() {
		return db.select().from(task);
	}

	@rpc()
	async update({ id, title, done }: typeof task.$inferSelect) {
		return await db
			.update(task)
			.set({ title, done })
			.where(eq(task.id, id))
			.returning()
			.then(takeUniqueOrThrow);
	}

	@rpc()
	async delete({ id }: typeof task.$inferSelect) {
		return db.delete(task).where(eq(task.id, id)).returning().then(takeUniqueOrThrow);
	}

	@rpc()
	async create(listId: number = 1) {
		return await db
			.insert(task)
			.values({ title: '', done: 0, listId })
			.returning()
			.then(takeUniqueOrThrow);
	}
}

const composer = Composer.init({
	TODO: new TODO()
});

composer.use(sveltekitMiddleware());
export type Client = typeof composer.clientType;

export async function POST(event) {
	return json(await composer.exec(event as any));
}
