import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { takeUniqueOrThrow } from '$lib/server/db/utils.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const actions = {
	signin: async ({request, cookies}) => {
    const form = await request.formData()
    const password = form.get('password')?.toString()!
    const username = form.get('username')?.toString()!
		console.log(username, password)

    const _user = await db.select().from(user).where(eq(user.username, username)).then(takeUniqueOrThrow).catch(() => {})
    if (_user?.password === password) {
      cookies.set('role', _user.role!, {path: '/'})
      throw redirect(300, '/todos')
    }
    return fail(400, {msg: 'Неправильный логин или пароль'})
	},

	signup: async ({request}) => {
		const form = await request.formData()
    const data = Object.fromEntries(form)
    console.log(data)
    const _user = await db.insert(user).values([data]).returning()

    console.log(_user)


		console.log('data', data)
	},

  signout: async({request, cookies}) =>{
    cookies.delete('role', {path: '/'})
    throw redirect(300, '/')
  }
};