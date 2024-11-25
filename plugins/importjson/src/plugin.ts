import CRDVerify, { initVnicPortMap } from "./crdVerify";
import { addCRDToIndex, getAllCRDs, initIndex } from "./crdIndex";
import { CustomResourceDefinition } from "./kube";

declare global {
	interface Window {
		importJSON: any,
	}
}

window.importJSON = importJSON;
function importJSON(jsonObjects: { [key: string]: any }[]) {

	if (false) return; // disable code

	initIndex();
	initVnicPortMap();

	for (const obj of jsonObjects) {
		if (obj.kind && obj.metadata) {
			addCRDToIndex(obj as CustomResourceDefinition);
			delete obj.errors;
			delete obj.change_request_commands;
		}
	}

	for (const crd of getAllCRDs()) {
		const results = CRDVerify.verify(crd);
		if (results.errors.length) {
			if (crd.errors === undefined) crd.errors = [];
			crd.errors.push(...results.errors);
		}
	}
}