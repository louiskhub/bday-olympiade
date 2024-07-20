import { redirect } from '@sveltejs/kit';
import { teamGames } from '$lib/db/constants';
import { getXataClientOnce } from '$lib/db/clients.js';

export async function load({ locals, params }) {
	const isTeamGame = teamGames.includes(params.game);
	if (!locals.teammate && isTeamGame) {
		throw redirect(302, '/teammate');
	}

	if (isTeamGame) {
		const team = await getXataClientOnce()
			.db.Teams.select(['id'])
			.filter({ $any: [{ player1: locals.playerId }, { player2: locals.playerId }] })
			.getFirst();

		const { wins, id } = await getXataClientOnce()
			.db.Team_Games.select(['wins'])
			.filter({ team, game: params.game })
			.getFirstOrThrow();

		console.log(wins);

		return { wins, recId: id };
	}
}

export const actions = {
	inc: async ({ request }) => {
		const { recId } = Object.fromEntries(await request.formData());
		await getXataClientOnce().db.Team_Games.update(recId, { wins: { $increment: 1 } });
		return { recId };
	},
	dec: async ({ request }) => {
		const { recId } = Object.fromEntries(await request.formData());
		console.log(recId);

		await getXataClientOnce().db.Team_Games.update(recId, { wins: { $decrement: 1 } });
		return { recId };
	}
};
