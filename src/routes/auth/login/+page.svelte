<script>
    // import { signIn } from "@auth/sveltekit/client";
    // import { SignIn, SignOut } from "@auth/sveltekit/components";
    // import { signUp } from "$lib/auth/cognito.ts";
    import { signIn } from "@auth/sveltekit/client";

    import { invalidateAll, goto } from "$app/navigation";
    import {
        Content,
        Grid,
        Row,
        Column,
        Tile,
        ClickableTile,
        PasswordInput,
        TextInput,
        Button,
        Form,
        FormGroup,
        Checkbox,
    } from "carbon-components-svelte";

    export let data;
    console.log(data);

    // let email =
    let password = "QX3cwOx6";
    let email = "mangosenyo@gmail.com";

    const createUser = async () => {
        try {
            const user = await signUp({ email, password });
        } catch (error) {
            console.log(`ERROR FROM CREATE USER :: ${error}`);
        }
        const user = await signUp(email, password);
        console.log(res, error);
    };

    const logIn = async (e) => {
        console.log(e);

        await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const googleLogin = async () => [
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        }),
    ];
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };
    const createUserchecmbox = () => {
        return "login";
    };

    const googleSignIn = async () => {
        try {
            let res = await signIn("google");
            let body = await res.json();
            console.log(body);
            let check = "error=CredentialsSignin";
            if (body.url.includes(check)) {
                // console.log("wow err");
                goto("/auth/resetpassword");
            }
        } catch (error) {
            console.log(error, "AWAIT SIGN ERR");
        }
    };

    const handleSubmit = async (event) => {
        console.log("huh");
        console.log(email, password);
        let cred = {
            email: email,
            password: password,
            redirect: false,
        };

        // signIn("credentials", cred)
        //     .then((res, error) => {
        //         console.log("done");
        //         return res.json();
        //     })
        //     .then(function (data) {
        //         console.log(data); // this will be a string
        //     });
        try {
            let res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            let body = await res.json();
            console.log(body);
            let check = "error=CredentialsSignin";
            if (body.url.includes(check)) {
                // console.log("wow err");
                goto("/auth/resetpassword");
            }
        } catch (error) {
            console.log(error, "AWAIT SIGN ERR");
        }
    };

    let bgUrl = "http://localhost:5173/images/abstract_scope.jpg";
</script>

<Content>
    <Row>
        <Column>
            <Tile>
                <h3 style="margin-bottom: 1em;">Log In</h3>
                <Form
                    on:submit={(e) => {
                        e.preventDefault();
                        //    handleSubmit();
                    }}
                >
                    <TextInput
                        style="margin-bottom:2em"
                        labelText="email"
                        placeholder="enter email"
                        size="sm"
                        bind:value={email}
                    />

                    <!-- <input name="email" bind:value={email} /> -->
                    <PasswordInput
                        tooltipAlignment="start"
                        type="text"
                        tooltipPosition="left"
                        labelText="Password"
                        placeholder="Enter password..."
                        bind:value={password}
                    />
                    <!-- <Button>Sign up</Button> -->

                    <Row style="margin-top:2em">
                        <!-- <Column style="margin-bottom:2em">
                            <Button kind="tertiary" on:click={createUser}
                                >Sign Up</Button
                            >
                        </Column> -->
                        <Column>
                            <Button on:click={handleSubmit}>Log In</Button>
                            <Button on:click={googleSignIn}>Google</Button>
                        </Column>
                    </Row>
                </Form>

                <!-- <Button on:click={handleSignOut}>Sign out</Button> -->
            </Tile>

            <Tile>
                <Row></Row>
            </Tile>
        </Column>
    </Row>
</Content>
