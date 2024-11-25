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
	let kind = 'Kind_is_not_set';
	let message = 'Message is not set - edit or replace client/public/parsejson/plugin.js';
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

	}

	return { date, level, category, kind, message, rawLine: undefined, additionalJSON, ignoreFields };
}
