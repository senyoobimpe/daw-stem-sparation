<script>
	import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
	import {
		FileUploader,
		FileUploaderButton,
		FileUploaderDropContainer,
		Button,
	} from "carbon-components-svelte";
	// import MusicAdd from "carbon-icons-svelte/lib/MusicAdd.svelte";
	// import Play from "carbon-icons-svelte/lib/Play.svelte";
	// import Stop from "carbon-icons-svelte/lib/Stop.svelte";

	import { MusicAdd, Play, Stop, CloudUpload } from "carbon-icons-svelte/lib";

	import {
		Content,
		Grid,
		Row,
		Column,
		Tile,
		ClickableTile,
		Dropdown,
	} from "carbon-components-svelte";

	import JSZip from "jszip";
	import JSZipUtils from "jszip-utils";

	import { updated, page } from "$app/stores";
	import { onMount } from "svelte";
	import fileSave from "file-saver";
	import * as Tone from "tone";
	// import { lambdaClient } from "./lambdaClient.js";
	import { LambdaClient } from "@aws-sdk/client-lambda";

	import { InvokeCommand } from "@aws-sdk/client-lambda"; // ES Modules import
	import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

	const lambdaClient = new LambdaClient({
		region: "us-east-1",
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: "us-east-1" },
			identityPoolId: "us-east-1_BKUS6f2By",
		}),
	});

	let zip = new JSZip();

	export let files;
	export let id;

	let upload_status = "ready";

	let base64str;

	let tracks = {};

	// export let data;

	const createStems = async (song) => {
		console.log(lambdaClient, "CLIENT IN ENVOKE");
		const command = new InvokeCommand({
			FunctionName: "lapi-CreateStems-Pu7tmY0KaoXU",
			Payload: JSON.stringify(song),
			LogType: "Tail",
		});
		if (lambdaCLient != undefined) {
			const res = await lambdaClient.send(command);
			console.log(res);
			// return res;
		}
		console.log("response from lambda");

		// const re = response.body.getReader();
	};

	const encode = async (file) => {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				let base64str = e.target.result.split(",")[1];
				resolve(base64str);
			};
		});
	};

	export const split = async () => {
		upload_status = "uploading";
		let encodedSong = await encode(files[0]);

		let stemRes = await createStems(encodedSong);

		console.log(stemRes);
		let text = new TextDecoder().decode(stemRes.Payload);
		console.log(text);

		let n = JSON.parse(text);
		let resjon = n.body;
		console.log(resjon);

		return resjon;
	};

	const downloadStems = async (res) => {
		await downloadTracks(tracks);
	};

	const items = [
		{ id: "0", text: "Stem Seperation" },
		{ id: "1", text: "Wav to MIDI" },
		// { id: "2", text: "Fax" },
	];

	let dropdown1_selectedId = "0";

	const formatSelected = (id) =>
		items.find((item) => item.id === id)?.text ?? "N/A";

	$: primary = formatSelected(dropdown1_selectedId);
</script>

<FileUploader
	bind:files
	multiple
	labelTitle="Add Files"
	buttonLabel="Add files"
	labelDescription="6 mb file limit"
	accept={[".wav, .mp3"]}
	status={upload_status}
/>
<Dropdown
	style="margin:2em 0 0 0"
	titleText="select task to perform"
	bind:selectedId={dropdown1_selectedId}
	{items}
/>

<!-- <Button style="margin-top:3em" on:click={split}>Split</Button> -->
