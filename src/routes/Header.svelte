<script>
	import { page } from "$app/stores";
	import { signOut } from "@auth/sveltekit/client";

	import {
		Header,
		HeaderUtilities,
		HeaderAction,
		HeaderGlobalAction,
		HeaderPanelLinks,
		HeaderPanelDivider,
		HeaderPanelLink,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column,
	} from "carbon-components-svelte";

	import {
		SettingsAdjust,
		UserAvatarFilledAlt,
		UserProfile,
		VolumeFileStorage,
	} from "carbon-icons-svelte/lib";

	import { goto } from "$app/navigation";
	let isSideNavOpen = false;
	let isOpen1 = false;
	let isOpen2 = false;

	let converting = false;
</script>

<Header href="/" company="NOISELAB" platformName="0.1" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<!-- <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} /> -->

		<!-- <HeaderAction
			style="display:flex; justify-content:center; align-items:center"
			bind:isOpen={isOpen1}
			icon={UserAvatarFilledAlt}
			closeIcon={UserAvatarFilledAlt}
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				goto("/account");
			}}
		></HeaderAction> -->

		<!-- {#if $page.data.session.user}
			<HeaderPanelLinks>
				<HeaderPanelDivider>Profile</HeaderPanelDivider>
				<HeaderPanelLink href="/account">Account</HeaderPanelLink>
			</HeaderPanelLinks>
		{:else}
			<HeaderPanelLinks>
				<HeaderPanelLink href="login">Log In</HeaderPanelLink>
			</HeaderPanelLinks>
		{/if} -->

		<!-- </HeaderAction> -->

		<!-- <HeaderAction  style="display:flex; justify-content:center; align-items:center" bind:isOpen={isOpen2}>
		<HeaderPanelLinks>
			<HeaderPanelDivider>Apps</HeaderPanelDivider>
			<HeaderPanelLink href="/split">Splitter</HeaderPanelLink>
  
			<HeaderPanelLink>Live Transcription</HeaderPanelLink>
			<HeaderPanelLink>Web Daw</HeaderPanelLink>
		</HeaderPanelLinks>
	  </HeaderAction> -->
	</HeaderUtilities>
</Header>

<SideNav rail bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();

				if ($page.data.session) {
					console.log($page.data.session);
					goto("/profile");
				} else {
					goto("/login");
				}
			}}
			size={24}
			icon={UserProfile}
			text="Profile"
		/>
		<SideNavLink
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				goto("/dashboard");
			}}
			size={24}
			icon={VolumeFileStorage}
			text="Dashboard"
		/>
		<!-- <SideNavLink text="Web Daw" /> -->
	</SideNavItems>
</SideNav>
