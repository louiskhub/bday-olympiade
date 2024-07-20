import { getXataClientOnce } from '$lib/db/clients';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	return { player: locals.player, teammate: locals.teammate };
}
