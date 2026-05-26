<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();

	let isTerminal = $derived(page.url.pathname === '/');
</script>

<svelte:head>
	<title>archculars — modern TUI for Arch + AUR</title>
</svelte:head>

<div class:terminal-page={isTerminal}>
	{@render children()}
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(a) {
		color: inherit;
	}
	.terminal-page {
		height: 100vh;
		height: 100dvh;
		overflow: hidden;
	}
	:global(body:has(.terminal-page)) {
		overflow: hidden;
		height: 100vh;
		height: 100dvh;
	}
</style>
