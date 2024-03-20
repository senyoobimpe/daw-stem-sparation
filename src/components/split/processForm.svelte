<script>
    import anime from "animejs";
    import { onDestroy } from "svelte";
    import {
        Content,
        Grid,
        Row,
        Column,
        Button,
        Tile,
        ClickableTile,
        FileUploaderDropContainer,
        Dropdown,
    } from "carbon-components-svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    import { MusicAdd, Play, Stop, CloudUpload } from "carbon-icons-svelte/lib";

    import Upload from "./upload.svelte";
    import LoadingScreen from "./uploadScreen.svelte";
    import ServeFile from "./serveFile.svelte";
    import Intro from "../home/intro.svelte";

    let files = [];
    let split;

    let upload_status = "ready";
    let downloadStems;
    let uploadContainer;
    let stems;
    let get;
    let downloadTracks;
    let tracks;
    let splitErrors = [];

    $: if (files.length > 0) {
        console.log("got file from split", files);
    }

    $: if (upload_status == "ready") {
        // collapseUpload();
        console.log("READYY");
    }
    $: if (upload_status == "uploading") {
        collapseUpload();
        collapseHero();
    }

    $: if (upload_status == "complete") {
        console.log("upload stautus completet");
        showResults();
    }

    export let data;

    let collapseHero = () => {
        console.log("hero co");
        anime({
            targets: ".hero",
            // translateX: 250,
            opacity: [{ value: [100, 0], duration: 0, easing: "easeOutQuad" }],
            // height: "0px",
            // width: "0px",
            margin: 0,
        });
    };

    let collapseUpload = () => {
        anime({
            targets: ".upload_hide",
            opacity: [{ value: [100, 0], duration: 0, easing: "easeOutQuad" }],
            margin: 0,
        });
        anime({
            targets: ".uploadShow",
            // translateX: 250,
            opacity: [
                { value: [0, 100], duration: 300, easing: "easeOutQuad" },
            ],
        });
        anime({
            targets: ".uploadContainer",
            padding: [{ value: ["1em"], duration: 300, easing: "easeOutQuad" }],
            height: [{ value: ["7em"], duration: 300, easing: "easeOutQuad" }],
            display: "flex",
            cursor: "pointer",
        });
    };

    let convert = async () => {
        upload_status = "uploading";
        try {
            let id = await split();
            let tracksUrls = await stems(id);
            console.log(id);
            console.log(tracksUrls);
        } catch (error) {
            upload_status = "failed";
            console.log(error);
        } finally {
            upload_status = "complete";
        }
    };

    let showResults = () => {
        anime({
            targets: ".results",
            // translateX: 250,
            opacity: [
                { value: [0, 100], duration: 300, easing: "easeOutQuad" },
            ],
        });
    };

    let expandUpload = () => {
        upload_status = "ready";
        anime({
            targets: ".upload_hide",
            // translateX: 250,
            opacity: [
                { value: [0, 100], duration: 300, easing: "easeOutQuad" },
            ],
        });

        anime({
            targets: ".uploadShow",
            // translateX: 250,
            opacity: "0",
            margin: "0",
        });

        anime({
            targets: ".uploadLable",
            // translateX: 250,

            margin: "0 0 3em 0",
        });
        anime({
            targets: ".convert_button",
            // translateX: 250,

            margin: "3em 0 0 0",
        });

        anime({
            targets: ".uploadContainer",
            // padding: "2em",
            height: "30em",

            // width: "20em",
            // height: "7em",
            // border: "2px solid #fff",
        });
    };

    const openDashboard = () => {
        goto("/dashboard");
    };
</script>

<Row>
    <Column>
        {#if upload_status}
            <Column
                bind:this={uploadContainer}
                class="uploadContainer"
                style="
        padding: 2em;
         border: 2px solid white;
         
"
            >
                <p
                    class="upload_hide uploadLable"
                    style="margin-bottom:3em; font-size:14px; height:auto;width:auto"
                >
                    Choose task to persform and upload track
                </p>
                <span
                    on:click={expandUpload}
                    style="display:flex; 
            justify-content:flex-start; 
            align-items:center;
             margin-top:-20px;
             "
                >
                    <CloudUpload style="margin: 0 0 1em 0; " size={50} />
                    {#if files[0]}
                        <p style="opacity:0; font-size:12px" class="uploadShow">
                            {files[0].name}
                        </p>
                    {/if}
                </span>

                <span class="upload_hide">
                    <Upload bind:files bind:split></Upload>
                </span>
                <Button
                    class="upload_hide convert_button"
                    style="margin:4em 0 0 0 "
                    on:click={convert}>Convert</Button
                >
            </Column>
        {/if}
        {#if upload_status == "uploading" || upload_status == "failed"}
            <LoadingScreen bind:upload_status></LoadingScreen>
        {/if}
        <span class="results" style="opacity:0;">
            <ServeFile id="serve" bind:stems bind:downloadTracks bind:tracks
            ></ServeFile>
        </span>
    </Column>
    {#if upload_status == "ready"}
        <Column class="hero">
            <Intro />
        </Column>
    {/if}
</Row>

{#if upload_status == "complete"}
    <Row style="justify-content:space-between; width:35em">
        <Button style="margin:4em 0 0 0 " on:click={downloadTracks(tracks)}
            >Download as ZIP</Button
        >
        <Button style="margin:4em 0 0 0 " on:click={openDashboard}
            >Open Dashbord</Button
        ></Row
    >
{:else if upload_status == "ready"}{/if}

<style>
    .uploadContainer {
        display: flex;

        justify-content: center;
        align-items: center;
        padding: 3em;
    }

    #serve {
        opacity: 0;
    }
</style>
