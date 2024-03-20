<script>
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

    let newpass = "";

    const handleSubmit = () => {};
</script>

<Content>
    <Row>
        <Column>
            <Tile>
                <h3 style="margin-bottom: 1em;">Reset Password</h3>
                <Form
                    on:submit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <!-- <input name="email" bind:value={email} /> -->
                    <PasswordInput
                        tooltipAlignment="start"
                        type="text"
                        tooltipPosition="left"
                        labelText="Password"
                        placeholder="Enter your new password..."
                        bind:value={newpass}
                    />
                    <!-- <Button>Sign up</Button> -->

                    <Row style="margin-top:2em">
                        <!-- <Column style="margin-bottom:2em">
                            <Button kind="tertiary" on:click={createUser}
                                >Sign Up</Button
                            >
                        </Column> -->
                        <Column>
                            <Button on:click={handleSubmit}
                                >Resetpassword</Button
                            >
                        </Column>
                    </Row>
                </Form>
            </Tile>
        </Column>
    </Row>
</Content>
