<!-- src/routes/account/+page.svelte -->
<script lang="ts">
    import {
        Content,
        Grid,
        Row,
        Column,
        Tile,
        ClickableTile,
        Form,
        Button,
        RadioButton,
        RadioButtonGroup,
        FormGroup,
        Select,
        SelectItem,
        Checkbox,
        TextInput,
    } from "carbon-components-svelte";

    // Import the new component
    import Avatar from "./Avatar.svelte";
    export let data;
    let { session, supabase } = data;
    $: ({ session, supabase } = data);

    const user = session.user;
    // console.log("session", session);
    let profileForm: HTMLFormElement;
    let avatarUrl: string = user?.avatar_url ?? "";

    const editprofile = (res) => {
        console.log(res);
    };
</script>

<Content>
    <Grid>
        <Row style="margin: 0 0 4em 0">
            <h1>Profile</h1>
        </Row>
        <Row>
            <h4>email: {user.email}</h4>

            <!-- <Button on:click(editprofile())>Edit Profile</Button> -->
        </Row>

        <Row style="margin: 4em 0 4em 0">
            <Form on:submit>
                <!-- <FormGroup legendText="Checkboxes">
                    <Checkbox
                        id="checkbox-0"
                        labelText="Checkbox Label"
                        checked
                    />
                    <Checkbox id="checkbox-1" labelText="Checkbox Label" />
                    <Checkbox
                        id="checkbox-2"
                        labelText="Checkbox Label"
                        disabled
                    />
                </FormGroup> -->
                <!-- <FormGroup legendText="Radio buttons">
                    <RadioButtonGroup
                        name="radio-button-group"
                        selected="default-selected"
                    >
                        <RadioButton
                            id="radio-1"
                            value="standard"
                            labelText="Standard Radio Button"
                        />
                        <RadioButton
                            id="radio-2"
                            value="default-selected"
                            labelText="Default Selected Radio Button"
                        />
                        <RadioButton
                            id="radio-4"
                            value="disabled"
                            labelText="Disabled Radio Button"
                            disabled
                        />
                    </RadioButtonGroup>
                </FormGroup> -->
                <!-- <FormGroup>
                    <TextInput
                        inline
                        labelText="User name"
                        placeholder="Enter user name..."
                    />
                </FormGroup>
                <Button type="submit">Submit</Button> -->
            </Form>
        </Row>
    </Grid>
</Content>
<!-- 
<div class="form-widget">
    <form
        class="form-widget"
        method="post"
        action="?/update"
        use:enhance={handleSubmit}
        bind:this={profileForm}
    >
        <Avatar
            {supabase}
            bind:url={avatarUrl}
            size={10}
            on:upload={() => {
                profileForm.requestSubmit();
            }}
        />

    </form>
</div> -->
