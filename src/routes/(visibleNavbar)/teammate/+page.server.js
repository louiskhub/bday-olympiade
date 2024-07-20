import { getXataClientOnce } from '$lib/db/clients.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { teamGames } from '$lib/db/constants';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (locals.teammate) {
		throw redirect(302, '/');
	}
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const { player } = Object.fromEntries(await request.formData());

		if (locals.teammate) {
			throw error(400, 'Du hast schon einen Teammate');
		}

		const [playerExists, playerAlreadyHasTeam] = await Promise.all([
			getXataClientOnce().db.Players.select(['id']).filter({ name: player }).getFirst(),
			getXataClientOnce()
				.db.Teams.select(['id'])
				.filter({ $any: [{ 'player1.name': player }, { 'player2.name': player }] })
				.getFirst()
		]);

		if (!playerExists) {
			throw error(400, 'Spieler existiert nicht');
		}
		if (playerAlreadyHasTeam) {
			throw error(400, 'Spieler hat schon ein Team');
		}

		const creationRes = await getXataClientOnce().db.Teams.create({
			player1: locals.playerId,
			player2: playerExists.id
		});

		if (!creationRes) {
			throw error(500, 'Fehler beim Erstellen des Spielers');
		}

		const createGames = await getXataClientOnce().db.Team_Games.create(
			teamGames.map((game) => ({ team: creationRes.id, game }))
		);

		cookies.set('teammate', player, { path: '.' });
		return;
	}
};
