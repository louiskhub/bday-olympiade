<script>
	import { enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import { getToastStore } from '@skeletonlabs/skeleton';

const toastStore = getToastStore();
			
const t = {
	message: '',
	background: '',
	timeout: 5 * 1000,
};

const handleSubmit = async () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				t.message = 'Spieler erfolgreich erstellt';
				t.background = 'variant-filled-success';
				toastStore.trigger(t);
				await goto('/');
				invalidateAll();
			} else if (result.type === 'error') {
				console.log(result)
				t.message = result.error.message;
				t.background = 'variant-filled-error';
				toastStore.trigger(t);
			}
		};
	};
</script>

<div class="px-4 py-60">
	<form method="POST" class="text-center" use:enhance={handleSubmit}>
		<input id="player" type="text" name="player" class="input p-4 mb-4" placeholder="Dein Name" >
		<button type="submit" class="btn p-4 variant-filled-primary">Spieler erstellen</button>
	</form>
</div>