import { V1ObjectMeta } from "./v1ObjectMeta";

export interface CustomResourceDefinition {
    errors: string[],
    change_request_commands: string[],
    apiVersion: string,
    kind: string,
    metadata: V1ObjectMeta
}

export enum Kind {
    LoadBalancer = 'LoadBalancer',
    LoadBalancerPool = 'LoadBalancerPool',
    LBPool = 'LBPool',
    LBPoolMember = 'LBPoolMember',
    SecurityGroup = 'SecurityGroup'
}

// VPC
export interface VPC extends CustomResourceDefinition {
    spec: {
        address_prefix: [
            {
                bitmask: string,
                cidr: string,
                created_at: string,
                id: string,
                is_default: boolean,
                name: string,
            }
        ],
        default_network_acl: string,
        default_security_group: string,
        service_address: {
            [key: string]: {
                address: string,
                id: string,
            }
        },
        status: {
            is_default: boolean,
            status: string | "available"
        }
    }
}

// FloatingIP
export interface FloatingIP extends CustomResourceDefinition {
    spec: {
        address: string,
        pool: string,
        resource_group: string,
        target: {
            TargetInterface: {
                id: string,
                is_baremetal_nic: boolean,
                name: string,
                primary_ipv4_address: string,
                vsi_id: string,
            },
            vpc_id: string,
        },
        zone: string,
    },
    status: {
        State: string | "available"
    }
}

// NetworkACL
export interface NetworkACL extends CustomResourceDefinition {
    spec: {
        resource_group: string,
        rules: [
            {
                action: "allow" | "deny",
                created_at: string,
                destination: string, // "0.0.0.0/0"
                destination_port_range: {
                    port_max: number,
                    port_min: number,
                }
            },
            direction: "inbound" | "outbound",
            name: string,
            protocol: "all" | "tcp" | "udp",
            source: string, // "0.0.0.0/0"
            source_port_range: {
                port_max: number,
                port_min: number,
            },
            uid: string,
        ]
    },
    status: {
        is_default: boolean,
        status: string | "available"
    }
}

// SecurityGroup
export interface SecurityGroup extends CustomResourceDefinition {
    spec: {
        resource_group: string,
        rules: [
            {
                direction: "inbound" | "outbound",
                id: string,
                ip_version: "ivp4" | "ipv6",
                protocol: {
                    protocol: "all" | "tcp" | "udp" | "icmp",
                    prot_max_ref: number,
                    port_min_ref: number,
                    type_ref: number // 8
                },
                remote: { cidr_block: string }, // 0.0.0.0/0
            }
        ],
        vpc: string,
    },
    state: {
        status: string | "available"
    },
    status: {
        is_default: boolean
    }
}

// Subnet
export interface Subnet extends CustomResourceDefinition {
    spec: {
        aclID: string,
        cidr: string,
        vpcID: string
    },
    status: {
        State: string | "available"
    }
}

// InstanceSpec
export interface InstanceSpec extends CustomResourceDefinition {
    spec: {
        nics: [
            virtualNetworkInterface: {
                Name: string,
                Namespace: string,
            }
        ],
        zone: string,
    }
}

// EndpointGateway
export interface EndpointGateway extends CustomResourceDefinition {
    spec: {
        destType: string | "vpc-services",
        endpoints: [
            zoneEndpoints: [
                {
                    address: string,
                    zone: string,
                }
            ]
        ],
        portInfo: [
            {
                port_max: number,
                port_min: number,
            }
        ],
        vpdID: string,
        zonalAffinity: boolean,
    },
    status: {
        allocation: {}
    }
}

// LoadBalancer
export interface LoadBalancer extends CustomResourceDefinition {
    spec: {
        IsPublic: boolean,
        IsService: boolean,
        is_partner: boolean,
        is_private_path: boolean,
        allocated_origin_ips: null,
        allocated_origin_mac_address: null,
        listeners: [
            {
                default_pool_id: string,
                id: string,
                port: number,
                portMax: number,
                protocol: "tcp" | "udp"
            }
        ],
        operating_status: "online" | "offline",
        primary_zone_ready: boolean,
        profile_name: "network-scalable",
        reserved_ip_ids: null,
        serviceips: [
            {
                address: string,
                pool_id: string,
                zone: string,
            }
        ],
        subnet_id: string,
        vpc_id: string,
    }
}

// LoadBalancerPool
export interface LoadBalancerPool extends CustomResourceDefinition {
    spec: {
        algorithm: "round_robin" | "weighted_round_robin",
        health_monitor: {
            deley: number,
            max_retries: number,
            port: number,
            timeout: number,
            type: "http" | "https" | "tcp",
            url_Path: string,
        },
        pool_member_list: [
            {
                id: string,
                protocol_port: number,
                status: string, // "available"
                target: {
                    account: string,
                    id: string,
                    vsi_id: string;
                },
                weight: number,
                zone: string,
            }
        ],
        protocol: "tcp" | "udp",
        proxy_protocol: "disabled",
    }
}

// LBPool
export interface LBPool extends CustomResourceDefinition {
    spec: {
        algorithm: "round_robin" | "weighted_round_robin",
        healthMonitor: {
            delay: number,
            max_retries: number,
            port: number,
            timeout: number,
            type: "http" | "https" | "tcp",
            url_path: string,
        }
    }
}

// LbPoolMember
export interface LBPoolMember extends CustomResourceDefinition {
    spec: {
        protocolPort: number,
        vnicId: string,
        weight: number,
        zone: string,
    },
    status: {
        healthState: string | "up" | "down" | "unknown",
    }
}







