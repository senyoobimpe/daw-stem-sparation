<script>
	import Header from "./Header.svelte";
	import "./styles.css";
	import { signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	// import Login from "./auth/login/Login.svelte";
	// import authStore from "../stores/authStore";
	// import "../app.css";
	import "carbon-components-svelte/css/g100.css";

	// custon theme
	// import "../app.css"

	// 	let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"

	// $: document.documentElement.setAttribute("theme", theme);
</script>

<div class="container mx-auto dark:bg-slate-800">
	<Header />

	<slot />
</div>

<style>
	/* .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	} */

	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
