import { getXataClientOnce } from '$lib/db/clients';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandle = async ({ event, resolve }) => {
	const player = event.cookies.get('player');
	const playerId = event.cookies.get('id');
	const teammate = event.cookies.get('teammate');

	if (!player && event.url.pathname !== '/signin') {
		throw redirect(302, '/signin');
	} else {
		event.locals.player = player;
		event.locals.playerId = playerId;
		if (teammate) {
			event.locals.teammate = teammate;
		} else {
			const res = await getXataClientOnce()
				.db.Teams.select(['player1', 'player2'])
				.filter({ $any: [{ 'player1.name': player }, { 'player2.name': player }] })
				.getFirst();
			if (res?.player1 && res?.player2) {
				event.locals.teammate = res.player1.name === player ? res.player2.name : res.player1.name;
			}
		}
	}

	return resolve(event);
};

export const handle = sequence(authHandle);
