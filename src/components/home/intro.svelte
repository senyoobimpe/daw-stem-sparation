<script>
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
    let feature;
    let index = 0;
    $: if (feature) {
        // console.log(feature);
    }
    $: if (index) {
        // console.log(feature);
    }
    let features = [
        "Create stems from any audio",

        "And much more",
        "Convert audio to midi",
    ];

    let scroll = (index) => {
        index >= 2 ? (index = 0) : (index += 1);
        feature = features[index];
        setTimeout(() => {
            scroll(index);
        }, "3000");
    };

    scroll(index);
</script>

<Content>
    <h1
        style="text-align:left;
        font-size: 4.5em
    "
    >
        NOISELAB lets you
    </h1>
    <div class="hero_scroll">
        {feature}
    </div>
</Content>

<style>
    .hero_scroll {
        font-size: 5.5em;
        font-weight: bold;
    }
</style>
