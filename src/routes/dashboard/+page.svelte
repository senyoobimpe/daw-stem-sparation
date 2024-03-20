<script>
    import {
        Content,
        Grid,
        Row,
        Column,
        Tile,
        ClickableTile,
    } from "carbon-components-svelte";
    import { DataTable } from "carbon-components-svelte";
    import { updated, page } from "$app/stores";

    import { ListObjectsV2Command } from "@aws-sdk/client-s3";
    import {
        CognitoIdentityClient,
        GetIdCommand,
    } from "@aws-sdk/client-cognito-identity"; // ES Modules import
    // const { CognitoIdentityClient, GetIdCommand } = require("@aws-sdk/client-cognito-identity"); // CommonJS import

    const client = new CognitoIdentityClient({ region: "us-east-1" });

    let getUser = async () => {
        const input = {
            // GetIdInput
            AccountId: "079171891912",
            IdentityPoolId: "us-east-1:e87ec92b-d5b1-459a-bed6-a71e02e7abf4", // required
            // Logins: {
            //     // LoginsMap
            //     "<keys>": "STRING_VALUE",
            // },
        };
        const command = new GetIdCommand(input);

        const response = await client.send(command);
        console.log(response);
    };

    // getUser();
    // { // GetIdResponse
    //   IdentityId: "STRING_VALUE",
    // };
    // const s3 = $page.data.s3;
    // const getS3Objects = async (folder_key) => {
    //     //console.log(folder_key, "in s3 obj");

    //     try {
    //         const command = new ListObjectsV2Command({
    //             Bucket: "tracks-destination-nl",
    //             Prefix: `${folder_key}`,
    //             // FetchOwner: true,
    //         });
    //         // const { res, err } = await s3.send(command);
    //         // //console.log(res, err, "LIST OBJECTS RES");
    //         return s3.send(command);
    //     } catch (error) {
    //         //console.log(error, "try catch ");
    //     }
    // };

    // const userFiles = await getS3Objects();
</script>

<Content>
    <DataTable
        headers={[
            { key: "name" },
            { key: "protocol", value: "Protocol" },
            { key: "port", value: "Port" },
            { key: "rule", value: "Rule" },
        ]}
        rows={[
            {
                id: "a",
                name: "Load Balancer 3",
                protocol: "HTTP",
                port: 3000,
                rule: "Round robin",
            },
        ]}
    />
</Content>
