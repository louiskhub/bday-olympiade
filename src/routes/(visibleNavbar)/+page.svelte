<script>
	import { page } from "$app/stores";
	import { individualGames, teamGames } from "$lib/db/constants";
	import { prettyPrintId } from "$lib/utils";
</script>


<div class="mb-8">
	<h2 class="text-2xl font-semibold">Spieler: {$page.data.player}</h2>
	{#if $page.data.teammate}
	<h2 class="text-2xl font-semibold">Teammate: {$page.data.teammate}</h2>
	{/if }
</div>

<h2 class="text-2xl font-semibold">Teamspiele</h2>
<div class="flex flex-col gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each teamGames as game}
	<div class="card p-4">
		<a href="/games/{game}">{prettyPrintId(game)}</a>
	</div>
	{/each}
  </div>
<h2 class="text-2xl font-semibold">Individuelle Spiele</h2>
<div class="flex flex-col gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each individualGames as game}
	<div class="card p-4">
		<a href="/games/{game}">{prettyPrintId(game)}</a>
	</div>
	{/each}
  </div>