import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// resolve: {
	// 	alias: {
	// 	  // added for AWS-SDK with vite
	// 	  "./runtimeConfig": "./runtimeConfig.browser"
	// 	},
	//   },
	plugins: [sveltekit()]
});
