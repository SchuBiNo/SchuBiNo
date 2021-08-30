export function getActive(location, path) {
	if (typeof location === 'string' && typeof location === 'string') return;
	if (location.includes(path)) return 'active';
	else return;
}
