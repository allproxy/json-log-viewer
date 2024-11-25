import { CustomResourceDefinition, Kind, LBPoolMember } from "./kube";

let indexByID: { [key: string]: CustomResourceDefinition } = {};
let indexByKind: { [key: string]: CustomResourceDefinition[] } = {};
let indexByLabels: { [key: string]: { [key: string]: CustomResourceDefinition[] } } = {}; // indexByLabels[label][label-value]

export function initIndex() {
    indexByID = {};
    indexByKind = {};
    indexByLabels = {};
}

export function addCRDToIndex(crd: CustomResourceDefinition) {
    // Index by ID
    indexByID[crd.metadata.name] = crd;

    // Index by kind
    const crds = indexByKind[crd.kind];
    if (crds) {
        crds.push(crd);
    } else {
        indexByKind[crd.kind] = [crd];
    }

    // Index by labels
    for (const label in crd.metadata.labels) {
        let innerIndexByLabelValue = indexByLabels[label];
        if (innerIndexByLabelValue) {
            const crds = innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]]
            if (crds) {
                crds.push(crd);
            } else {
                innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]] = [crd];
            }
        } else {
            innerIndexByLabelValue = {};
            innerIndexByLabelValue[crd.kind + crd.metadata.labels[label]] = [crd];
            indexByLabels[label] = innerIndexByLabelValue;
        }
    }
}

export function getAllCRDs(): CustomResourceDefinition[] {
    return Object.values(indexByID);
}

export function findCRDsByKind(kind: string): CustomResourceDefinition[] {
    const crds = indexByKind[kind];
    return crds ? crds : [];
}

export function findCRDByID(id: string): CustomResourceDefinition | undefined {
    return indexByID[id];
}

export function findCRDsByLabel(crd: CustomResourceDefinition, label: string, value: string): CustomResourceDefinition[] {
    const innerIndexByLabelValue = indexByLabels[label];
    if (innerIndexByLabelValue) {
        const crds = innerIndexByLabelValue[crd.kind + value];
        return crds ? crds : [];
    }
    return [];
}