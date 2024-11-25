/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseJSON: () => (/* binding */ parseJSON)
/* harmony export */ });
// Function called to extract date, level, app name and message
//
// @param preJSONString: string - optional non-JSON string proceeding JSON object
// @param jsonObject: {} - JSON log data
// @returns {date: Date, level: string, category: string, appName: string, message: string, additionalJSON: {} }
//
// category is the availability zone
// appName is the pod name
window.parseJSON = parseJSON;
function parseJSON(preJSONString, jsonObject) {
    let level = 'info';
    let date = new Date();
    let category = '';
    let kind = 'Kind_is_not_set';
    let message = 'Message is not set - edit or replace client/public/parsejson/plugin.js';
    let additionalJSON = {};
    const ignoreFields = [];
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
    }
    else { // Check for other log formats
    }
    return { date, level, category, kind, message, rawLine: undefined, additionalJSON, ignoreFields };
}

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=plugin.js.map