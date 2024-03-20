<script>
	import { page } from "$app/stores";
	import {
		Content,
		Grid,
		Row,
		Column,
		Button,
		Tile,
		ClickableTile,
	} from "carbon-components-svelte";

	// console.log($page.data.supabase)

	import Fork from "carbon-icons-svelte/lib/Fork.svelte";
	import DataShare from "carbon-icons-svelte/lib/DataShare.svelte";
	import Shuffle from "carbon-icons-svelte/lib/Shuffle.svelte";

	import ProcessForm from "../components/split/processForm.svelte";

	import Headphones from "carbon-icons-svelte/lib/Headphones.svelte";
	import { browser } from "$app/environment";

	console.log($page.data.session);

	async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		console.log(session);
	};

	// 	if (browser) {
	// 	let body = document.body
	// 	console.log(body)
	// 	document.body.style.background= 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
	// 	// body.style.background-image =
	// 	// body.style.background-color= '#0093E9';
	//   }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="NOISELAB" />
</svelte:head>

<Content>
	<!-- {#if $page.data.session}
LOGGED IN
{:else}
NOT LOGGED IN
{/if} -->
	<Grid>
		<ProcessForm></ProcessForm>
	</Grid>
</Content>

<style>
	/* :global(body) {
		background-color: #0093E9;
		background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

	

	/* :global(#header) {
		border: solid 40px blue ;
	} */
</style>
