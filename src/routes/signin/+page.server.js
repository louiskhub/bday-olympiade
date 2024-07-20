import { getXataClientOnce } from '$lib/db/clients.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (locals.player) {
		throw redirect(302, '/');
	}
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const { player } = Object.fromEntries(await request.formData());

		if (locals.player) {
			throw error(400, 'Du hast schon einen Account');
		}

		const res = await getXataClientOnce()
			.db.Players.select(['id'])
			.filter({ name: player })
			.getFirst();

		if (res) {
			throw error(400, 'Name schon vergeben');
		}

		const creationRes = await getXataClientOnce().db.Players.create({ name: player });

		if (!creationRes) {
			throw error(500, 'Fehler beim Erstellen des Spielers');
		}

		cookies.set('player', player, { path: '.' });
		cookies.set('id', creationRes.id, { path: '.' });
		return;
	}
};
