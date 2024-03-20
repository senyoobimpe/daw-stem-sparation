<script>
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
    import {
        FileUploader,
        FileUploaderButton,
        FileUploaderDropContainer,
        Button,
    } from "carbon-components-svelte";
    import MusicAdd from "carbon-icons-svelte/lib/MusicAdd.svelte";
    import Play from "carbon-icons-svelte/lib/Play.svelte";
    import Stop from "carbon-icons-svelte/lib/Stop.svelte";

    import { GetObjectCommand } from "@aws-sdk/client-s3";
    import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

    import * as Tone from "tone";

    import {
        Content,
        Grid,
        Row,
        Column,
        Tile,
        ClickableTile,
    } from "carbon-components-svelte";

    import JSZip from "jszip";
    import JSZipUtils from "jszip-utils";

    import { updated, page } from "$app/stores";
    import { onMount } from "svelte";
    import fileSave from "file-saver";

    import { ListObjectsV2Command } from "@aws-sdk/client-s3";

    export let id;

    const s3 = $page.data.s3;
    let zip = new JSZip();
    export let tracks = [];

    export const downloadTracks = async (tracks) => {
        const urlPromises = async () => {
            try {
                for (let track of Object.keys(tracks)) {
                    let url = tracks[track].url;
                    let name = tracks[track].name;
                    const res = await JSZipUtils.getBinaryContent(url);
                    zip.file(name, res, { binary: true });
                }
            } catch (error) {}
        };

        urlPromises()
            .then((res) => {
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    fileSave.saveAs(content, "noiselab_stems");
                });
            })
            .catch((err) => {});
    };

    const getS3Objects = async (folder_key) => {
        try {
            const command = new ListObjectsV2Command({
                Bucket: "tracks-destination-nl",
                Prefix: `${folder_key}/split`,
                // FetchOwner: true,
            });
            return s3.send(command);
        } catch (error) {
            //console.log(error, "try catch ");
        }
    };

    const downloadArr = async (stems, id) => {
        const iter_stems = async (stems) => {
            const stems_ = stems.Contents;
            const promises = [];

            try {
                for (let index in stems_) {
                    let key = stems_[index]["Key"];
                    const command = new GetObjectCommand({
                        Bucket: "tracks-destination-nl",
                        Key: key,
                    });
                    const res = getSignedUrl(s3, command, { expiresIn: 3600 });
                    promises.push(res);
                }
            } catch (error) {
                //console.log(error, "errr");
            }
            return promises;
        };

        const arr = await iter_stems(stems);

        const p = await Promise.all(arr);

        return p;
    };

    const prepTracks = (list, key) => {
        try {
            for (let i in list) {
                let track = list[i];
                console.log(track.toString());
                let k = track.split("/");
                console.log(k);

                let n = k[5].split("?");

                console.log(n[0]);
                // let filename = n.split("?")[0];
                // //console.log(filename, "filename");

                tracks[n[0]] = {
                    url: track,
                    name: n[0],
                    player: new Tone.Player(track).toDestination(),
                };
            }
        } catch (error) {
            //console.log(error);
        } finally {
            //console.log(tracks, "tracks !");
        }
    };
    export const downloadStems = async (res) => {
        await downloadTracks(tracks);
    };

    export const stems = async (id) => {
        //console.log(id, "IIDD");
        let s3objects = await getS3Objects(id);
        let urlList = await downloadArr(s3objects);
        let tracks = await prepTracks(urlList, id);
        return urlList;
    };
</script>

<svelte:head>
    <title>Split</title>
    <meta name="description" content="Create stem from song" />
</svelte:head>

<p style="font-weight:bold; margin: 2em 0 1em 0">stems</p>
{#if tracks}
    {#each Object.entries(tracks) as [track, val]}
        <Tile
            style="     margin-bottom: 1em;
						display: flex;
						justify-content: space-between;
						align-items: center;"
        >
            <p style=" margin: 0 1em 0 0">{track}</p>
            <!-- {tracks.track.name} -->

            <!-- TIMELINE -->
            <audio controls src={val.url}></audio>

            <div></div>

            <!-- <div
								style="display:flex; justify-content:space-between"
							>
								<span
									style="cursor: pointer;"
									on:click={play(val.player)}
								>
									<Play size={25} />
								</span>

								<span
									style="cursor: pointer;"
									on:click={stop(val.player)}
								>
									<Stop size={25} />
								</span>
							</div> -->
        </Tile>
    {/each}
{/if}
