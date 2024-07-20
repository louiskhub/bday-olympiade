export function prettyPrintId(id) {
	return id.replaceAll('_', ' ').replaceAll('ae', 'ä').replaceAll('oe', 'ö').replaceAll('ue', 'ü');
}
