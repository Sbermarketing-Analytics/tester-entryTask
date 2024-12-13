import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import swc from 'unplugin-swc'

export default defineConfig({
	plugins: [sveltekit(), swc.vite()	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
