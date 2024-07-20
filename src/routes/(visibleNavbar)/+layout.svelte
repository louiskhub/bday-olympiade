<script>
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import logo from '$lib/assets/olympia.png';

	import { page } from '$app/stores';
</script>

<AppBar class="sticky top-0 text-sm font-light justify-between">
	{@const routeWithParams = $page.url.href.replace($page.url.origin, '')}
	<svelte:fragment slot="lead">
	<a class="flex" href="/">
		<img alt="logo" src={logo} class="w-16" />
	</a>
</svelte:fragment>
	<TabGroup active="variant-ghost">
	<TabAnchor
		href="/"
		class="text-black"
		selected={routeWithParams === '/'}
		>Home</TabAnchor
	>
	<TabAnchor
		href="/leaderboard"
		class="text-black"
		selected={routeWithParams === '/leaderboard'}
		>Leaderboard</TabAnchor
	>
</TabGroup>
</AppBar>

<div class="p-4">
	<slot />
</div>