import { findCRDsByKind, findCRDByID, findCRDsByLabel } from './crdIndex';
import { CustomResourceDefinition, Kind, LBPoolMember, LoadBalancer, LoadBalancerPool, FloatingIP, SecurityGroup, NetworkACL, LBPool } from './kube'

let vnicPortMap: { [key: string]: LBPoolMember } = {};

export function initVnicPortMap() {
    vnicPortMap = {};
}

export class CRDVerifyResults {
    public errors: string[];

    constructor() {
        this.errors = [];
    }
}

export default class CRDVerify {
    public static verify(jsonObject: { [key: string]: any }): CRDVerifyResults {
        const crd = jsonObject as CustomResourceDefinition;
        if (crd.metadata.deletionTimestamp) {
            crd.errors = ["DELETE PENDING: Object is delete pending.  DeletionTimestamp=" + crd.metadata.deletionTimestamp];
        }

        return new CRDVerifyResults();
    }
}