/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CRDVerifyResults: () => (/* binding */ CRDVerifyResults),
/* harmony export */   "default": () => (/* binding */ CRDVerify),
/* harmony export */   initVnicPortMap: () => (/* binding */ initVnicPortMap)
/* harmony export */ });
let vnicPortMap = {};
function initVnicPortMap() {
    vnicPortMap = {};
}
class CRDVerifyResults {
    constructor() {
        this.errors = [];
    }
}
class CRDVerify {
    static verify(jsonObject) {
        const crd = jsonObject;
        if (crd.metadata.deletionTimestamp) {
            crd.errors = ["DELETE PENDING: Object is delete pending.  DeletionTimestamp=" + crd.metadata.deletionTimestamp];
        }
        return new CRDVerifyResults();
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCRDToIndex: () => (/* binding */ addCRDToIndex),
/* harmony export */   findCRDByID: () => (/* binding */ findCRDByID),
/* harmony export */   findCRDsByKind: () => (/* binding */ findCRDsByKind),
/* harmony export */   findCRDsByLabel: () => (/* binding */ findCRDsByLabel),
/* harmony export */   getAllCRDs: () => (/* binding */ getAllCRDs),
/* harmony export */   initIndex: () => (/* binding */ initIndex)
/* harmony export */ });
let indexByID = {};
let indexByKind = {};
let indexByLabels = {}; // indexByLabels[label][label-value]
function initIndex() {
    indexByID = {};
    indexByKind = {};
    indexByLabels = {};
}
function addCRDToIndex(crd) {
    // Index by ID
    indexByID[crd.metadata.name] = crd;
    // Index by kind
    const crds = indexByKind[crd.kind];
    if (crds) {
        crds.push(crd);
    }
    else {
        indexByKind[crd.kind] = [crd];
    }
    // Index by labels
    for (const label in crd.metadata.labels) {
        let innerIndexByLabelValue = indexByLabels[label];
        if (innerIndexByLabelValue) {
            const crds = innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]];
            if (crds) {
                crds.push(crd);
            }
            else {
                innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]] = [crd];
            }
        }
        else {
            innerIndexByLabelValue = {};
            innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]] = [crd];
            indexByLabels[label] = innerIndexByLabelValue;
        }
    }
}
function getAllCRDs() {
    return Object.values(indexByID);
}
function findCRDsByKind(kind) {
    const crds = indexByKind[kind];
    return crds ? crds : [];
}
function findCRDByID(id) {
    return indexByID[id];
}
function findCRDsByLabel(crd, label, value) {
    const innerIndexByLabelValue = indexByLabels[label];
    if (innerIndexByLabelValue) {
        const crds = innerIndexByLabelValue[crd.kind + value];
        return crds ? crds : [];
    }
    return [];
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crdVerify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _crdIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


window.importJSON = importJSON;
function importJSON(jsonObjects) {
    if (false)
        {} // disable code
    (0,_crdIndex__WEBPACK_IMPORTED_MODULE_1__.initIndex)();
    (0,_crdVerify__WEBPACK_IMPORTED_MODULE_0__.initVnicPortMap)();
    for (const obj of jsonObjects) {
        if (obj.kind && obj.metadata) {
            (0,_crdIndex__WEBPACK_IMPORTED_MODULE_1__.addCRDToIndex)(obj);
            delete obj.errors;
            delete obj.change_request_commands;
        }
    }
    for (const crd of (0,_crdIndex__WEBPACK_IMPORTED_MODULE_1__.getAllCRDs)()) {
        const results = _crdVerify__WEBPACK_IMPORTED_MODULE_0__["default"].verify(crd);
        if (results.errors.length) {
            if (crd.errors === undefined)
                crd.errors = [];
            crd.errors.push(...results.errors);
        }
    }
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=plugin.js.map