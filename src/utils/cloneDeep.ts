export default function cloneDeep(obj: Record<string, any>): Record<string, any> {
	if (typeof obj !== 'object') {
		return obj;
	}

	const newObj: Record<string, any> = obj instanceof Array ? [] : {};

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = typeof obj[key] === 'object' ? cloneDeep(obj[key]) : obj[key];
		}
	}

	return newObj;
}
