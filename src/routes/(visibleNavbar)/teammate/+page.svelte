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
				t.message = 'Team erfolgreich erstellt!';
				t.background = 'variant-filled-success';
				toastStore.trigger(t);
				await goto('/');
				invalidateAll();
			} else if (result.type === 'error') {
				t.message = result.error.message;
				t.background = 'variant-filled-error';
				toastStore.trigger(t);
			}
		};
	};
</script>

<form method="POST" class="text-center py-24" use:enhance={handleSubmit}>
	<h2 class="text-2xl mb-4">Team erstellen</h2>
	<input id="player" type="text" name="player" class="input p-4 mb-4" placeholder="Der Name deines Teammates" >
	<button type="submit" class="btn p-4 variant-filled-primary">Team erstellen</button>
</form>