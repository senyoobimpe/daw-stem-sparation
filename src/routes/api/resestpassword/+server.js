import { error } from '@sveltejs/kit';


/** @type {import('./$types').RequestHandler} */

const resetPassword = async (username, password) => {

    const client = new CognitoIdentityProviderClient(CONFIGS);
    const input = { // AdminSetUserPasswordRequest
        UserPoolId: COGNITO_USER_POOL_ID, // required
        Username: username, // required
        Password: password, // required
        Permanent: true || false,
    };
    const command = new AdminSetUserPasswordCommand(input);
    const response = await client.send(command);

}
export function POST({ request }) {

    const { username, password } = await request.json();



    return new Response(String(""));
}