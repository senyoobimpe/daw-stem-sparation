<script>
    import {
        FileUploader,
        FileUploaderButton,
        FileUploaderDropContainer,
        Button,
    } from "carbon-components-svelte";

    import {
        Content,
        Grid,
        Row,
        Column,
        Tile,
        ClickableTile,
    } from "carbon-components-svelte";

    // console.log(JSZip.version);

    export let upload_status;
    let uploadmsg;

    console.log("loadins");

    $: if (upload_status === "ready") {
        console.log("ready");
        uploadmsg = "";
    }
    $: if (upload_status === "uploading") {
        uploadmsg = "creating stems";
    }
    $: if (upload_status === "complete") {
        uploadmsg = "your file is ready to download";
    }

    $: if (upload_status == "failed") {
        console.log("UPLOAD FIALED@@");
        uploadmsg = "you dont have permission to perform this action";

        // setTimeout(() => (upload_status = "ready"), 2000);
    }
</script>

<svelte:head>
    <title>Split</title>
    <meta name="description" content="Create stem from song" />
</svelte:head>

<Column
    class="loadingContainer"
    style="
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border: 2px solid white;
margin: 3em 0 0 0;
padding:2em;
width:100em"
>
    {#if upload_status == "uploading" && upload_status != "failed"}
        <svg
            style="filter: invert(95%) sepia(5%) saturate(19%) hue-rotate(220deg) brightness(106%) contrast(104%);"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><style>
                .spinner_LWk7 {
                    animation:
                        spinner_GWy6 1.2s linear infinite,
                        spinner_BNNO 1.2s linear infinite;
                }
                .spinner_yOMU {
                    animation:
                        spinner_GWy6 1.2s linear infinite,
                        spinner_pVqn 1.2s linear infinite;
                    animation-delay: 0.15s;
                }
                .spinner_KS4S {
                    animation:
                        spinner_GWy6 1.2s linear infinite,
                        spinner_6uKB 1.2s linear infinite;
                    animation-delay: 0.3s;
                }
                .spinner_zVee {
                    animation:
                        spinner_GWy6 1.2s linear infinite,
                        spinner_Qw4x 1.2s linear infinite;
                    animation-delay: 0.45s;
                }
                @keyframes spinner_GWy6 {
                    0%,
                    50% {
                        width: 9px;
                        height: 9px;
                    }
                    10% {
                        width: 11px;
                        height: 11px;
                    }
                }
                @keyframes spinner_BNNO {
                    0%,
                    50% {
                        x: 1.5px;
                        y: 1.5px;
                    }
                    10% {
                        x: 0.5px;
                        y: 0.5px;
                    }
                }
                @keyframes spinner_pVqn {
                    0%,
                    50% {
                        x: 13.5px;
                        y: 1.5px;
                    }
                    10% {
                        x: 12.5px;
                        y: 0.5px;
                    }
                }
                @keyframes spinner_6uKB {
                    0%,
                    50% {
                        x: 13.5px;
                        y: 13.5px;
                    }
                    10% {
                        x: 12.5px;
                        y: 12.5px;
                    }
                }
                @keyframes spinner_Qw4x {
                    0%,
                    50% {
                        x: 1.5px;
                        y: 13.5px;
                    }
                    10% {
                        x: 0.5px;
                        y: 12.5px;
                    }
                }
            </style><rect
                class="spinner_LWk7"
                x="1.5"
                y="1.5"
                rx="1"
                width="9"
                height="9"
            /><rect
                class="spinner_yOMU"
                x="13.5"
                y="1.5"
                rx="1"
                width="9"
                height="9"
            /><rect
                class="spinner_KS4S"
                x="13.5"
                y="13.5"
                rx="1"
                width="9"
                height="9"
            /><rect
                class="spinner_zVee"
                x="1.5"
                y="13.5"
                rx="1"
                width="9"
                height="9"
            /></svg
        >
    {/if}

    {#if upload_status == "failed"}
        Upload Failed
    {/if}

    <div style="margin-top: 2em;">{uploadmsg}</div>
</Column>

<style>
    .loadingContainer {
    }
</style>
