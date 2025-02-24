// Function called to extract date, level, app name and message
//
// @param preJSONString: string - optional non-JSON string proceeding JSON object
// @param jsonObject: {} - JSON log data
// @returns {date: Date, level: string, category: string, appName: string, message: string, additionalJSON: {} }
//
// category is the availability zone
// appName is the pod name

declare global {
	interface Window {
		parseJSON: any,
	}
}

window.parseJSON = parseJSON;
export function parseJSON(
	preJSONString: string,
	jsonObject: { [key: string]: any }): {
		date: Date | undefined,
		level: string,
		category: string,
		kind: string,
		message: string,
		rawLine: string | undefined,
		additionalJSON: { [key: string]: any },
		ignoreFields: string[]
	} {
	let level = 'info';
	let date = new Date();
	let category = '';
	let kind = 'Kind_is_not_defined';
	let message = `Message field not defined - click '?'`;
	let additionalJSON: { [key: string]: any } = {};
	const ignoreFields: string[] = [];

	// Kube object?
	if (jsonObject.kind && jsonObject.metadata) {
		kind = jsonObject.kind;
		message = jsonObject.metadata.name;
		if (jsonObject.metadata.creationTimestamp) {
			date = new Date(jsonObject.metadata.creationTimestamp);
		}
		level = '';
		additionalJSON.level = undefined;

		// Errors detected by the parseJson plugin?
		if (jsonObject['errors']) {
			level = 'error';
			additionalJSON.level = level;
		}
	} else { // Check for other log formats
		let dateSet = false;
		let levelSet = false;
		let kindSet = false;
		let messageSet = false;

		const fieldValues: { field: string, value: string }[] = []; // array of {field, value} pairs  

		// Recursively traverse JSON and build fieldValues array
		function traverseJson(obj: { [key: string]: any }) {
			for (let field in obj) {
				const value = obj[field];
				if (typeof field === 'string' && typeof value === 'string') {
					field = field.toLowerCase();
					fieldValues.push({ field, value });
				} else if (typeof value === 'object' && !Array.isArray(value)) {
					traverseJson(value);
				}
			}
		}
		traverseJson(jsonObject);

		// Check each JSON field,value pair looking for date, info, kind and message
		for (const fieldValue of fieldValues) {
			const field = fieldValue.field;
			const value = fieldValue.value;

			checkForDateLevelKindMessage(field, value);

			if (dateSet && levelSet && kindSet && messageSet) break;
		}

		// Check for data, level, kind and message fields
		function checkForDateLevelKindMessage(field: string, value: string) {
			if (!dateSet) {
				if ((field.includes('time') || field.includes('date')) && isValidDate(value)) {
					dateSet = true;
					date = new Date(value);
					return;
				}
			}

			if (!levelSet) {
				if (field === 'level' || field === 'severity') {
					levelSet = true;
					level = value;
					return;
				} else if (field === 'error') {
					levelSet = true;
					level = 'error';

				}
			}

			if (!kindSet) {
				if (field.length <= 64 && (field === 'kind' || field.startsWith("thread") || field.startsWith('app'))) {
					kindSet = true;
					kind = value;
					return;
				}
			}

			if (!messageSet) {
				if (field === 'message' || field === 'error') {
					messageSet = true;
					message = value;
					return;
				}
			}
		}

		// Returns true, if this is a valid date
		function isValidDate(value: string) {
			try {
				let date = new Date(value);
				if (date.toString() === 'Invalid Date' && typeof value === 'string') {
					const tokens = value.split(':', 2);
					if (tokens.length === 2) {
						let d = new Date(tokens[0]);
						date = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ':' + tokens[1]);
					}
				}
				if (date.toString() === 'Invalid Date') return false;
			} catch (e) {
				return false;
			}
			return true;
		}
	}

	return { date, level, category, kind, message, rawLine: undefined, additionalJSON, ignoreFields };
}
