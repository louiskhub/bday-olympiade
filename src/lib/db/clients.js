import { XATA_API_KEY } from '$env/static/private';
import { XataClient } from './xata';

let xataInstance = undefined;

export const getXataClientOnce = () => {
	if (xataInstance) {
		return xataInstance;
	}

	const options = { apiKey: XATA_API_KEY, branch: 'main' };
	xataInstance = new XataClient({ apiKey: XATA_API_KEY, branch: 'main' });

	return xataInstance;
};
