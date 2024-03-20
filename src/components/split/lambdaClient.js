import { LambdaClient } from "@aws-sdk/client-lambda";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// An Amazon Cognito Identity Pool ID. Replace with the identity pool ID created
// for this example.
const IDENTITY_POOL_ID = "";
// An Amazon Cognito Region. Replace with the region that is hosting the resources for this example.
const REGION = "us-east-1";


const lambdaClient = new LambdaClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        clientConfig: { region: "us-east-1" },
        identityPoolId: IDENTITY_POOL_ID,
    }),

});

console.log(lambdaClient, "LAMBDA CLIENT")


export { lambdaClient };
