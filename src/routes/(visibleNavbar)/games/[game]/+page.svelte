<script>
	import { enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import { prettyPrintId } from "$lib/utils";
	import { getToastStore } from '@skeletonlabs/skeleton';

const toastStore = getToastStore();
			
const t = {
	message: '',
	background: '',
	timeout: 5 * 1000,
};

const handleSubmit = async () => {
		console.log('asdf')
		return async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
			} else if (result.type === 'error') {
				t.message = result.error.message;
				t.background = 'variant-filled-error';
				toastStore.trigger(t);
			}
		};
	};

$: wins = $page.data.wins
</script>

<div class="text-center py-24">
	<h2 class="text-2xl mb-4">{prettyPrintId($page.params.game)}</h2>
	<p>Siege: {wins}</p>
		
<div class="flex justify-center gap-10 mt-10">
	<form method="POST" class="text-center"  use:enhance={handleSubmit} action="?/inc">
		<input type="hidden" name="recId" value={$page.data.recId} />
		<button class="text-3xl   btn variant-filled-primary ">+</button>
	</form>
	<form method="POST" class="text-center" use:enhance={handleSubmit} action="?/dec">
		<input type="hidden" name="recId" value={$page.data.recId} />
		<button class="text-3xl   btn variant-filled-primary ">-</button>
	</form>
</div>
</div >
