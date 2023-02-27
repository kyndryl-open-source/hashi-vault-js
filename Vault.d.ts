// Type definitions for hashi-vault-js
// Project: https://github.com/rod4n4m1/hashi-vault-js
// Definitions by: Osama Adil <https://github.com/phr3nzy/>

/// <reference types="node" />

import type { Axios, AxiosProxyConfig } from "axios";
import type { Agent } from "https";

export type CertConfig = {
	/**
	 * If https is true, then provide client certificate, client key and
	 * the root CA cert.
	 * Client cert and key are optional now.
	 * @example './path/to/your/cert.crt'
	 */
	cert: string;
	/**
	 * @example './path/to/your/key.key
	 */
	key: string;
	/**
	 * @example './path/to/your/cacert.crt
	 */
	cacert: string;
};

export type VaultConfig = {
	/**
	 * Indicates if the HTTP request to the Vault server should use
	 * HTTPS (secure) or HTTP (non-secure) protocol
	 */
	https?: boolean;
	/**
	 * Indicate the server name/IP, port and API version for the Vault instance,
	 * all paths are relative to this one
	 */
	baseUrl?: string;
	/**
	 * Sets the root path after the base URL, it translates to a
	 * partition inside the Vault where the secret engine / auth method was enabled.
	 * Can be passed individually on each function through mount parameter
	 */
	rootPath: string;
	/**
	 * HTTP request timeout in milliseconds
	 */
	timeout: number;
	/**
	 * If should use a proxy or not by the HTTP request
	 * Example:
	 * proxy: { host: proxy.ip, port: proxy.port }
	 */
	proxy?: AxiosProxyConfig | boolean;
	/**
	 * Namespace (multi-tenancy) feature available on all Vault Enterprise versions
	 */
	namespace?: string;
} & Partial<CertConfig>;

export type CertificateFormat = "der" | "pem";
export type KeyType = "rsa" | "ec";
export type PKFormat = "der" | "pkcs8";

export type ErrorResponse = {
	isVaultError?: boolean;
	vaultHelpMessage?: string;
	response?: {
		status?: number;
		statusText?: string;
	}
};

interface Cpu {
	cpu: number;
	vendorId: string;
	family: string;
	model: string;
	stepping: number;
	physicalId: string;
	coreId: string;
	cores: number;
	modelName: string;
	mhz: number;
	cacheSize: number;
	flags: string[];
	microcode: string;
}

interface CpuTime {
	cpu: string;
	user: number;
	system: number;
	idle: number;
	nice: number;
	iowait: number;
	irq: number;
	softirq: number;
	steal: number;
	guest: number;
	guestNice: number;
}

interface Disk {
	path: string;
	fstype: string;
	total: number;
	free: number;
	used: number;
	usedPercent: number;
	inodesTotal: number;
	inodesUsed: number;
	inodesFree: number;
	inodesUsedPercent: number;
}

interface Host {
	hostname: string;
	uptime: number;
	bootTime: number;
	procs: number;
	os: string;
	platform: string;
	platformFamily: string;
	platformVersion: string;
	kernelVersion: string;
	kernelArch: string;
	virtualizationSystem: string;
	virtualizationRole: string;
	hostid: string;
}

interface Memory {
	total: number;
	available: number;
	used: number;
	usedPercent: number;
	free: number;
	active: number;
	inactive: number;
	wired: number;
	laundry: number;
	buffers: number;
	cached: number;
	writeback: number;
	dirty: number;
	writebacktmp: number;
	shared: number;
	slab: number;
	sreclaimable: number;
	sunreclaim: number;
	pagetables: number;
	swapcached: number;
	commitlimit: number;
	committedas: number;
	hightotal: number;
	highfree: number;
	lowtotal: number;
	lowfree: number;
	swaptotal: number;
	swapfree: number;
	mapped: number;
	vmalloctotal: number;
	vmallocused: number;
	vmallocchunk: number;
	hugepagestotal: number;
	hugepagesfree: number;
	hugepagesize: number;
}


export type HealthCheckParams = {
	standbyok: boolean;
	perfstandbyok: boolean;
	activecode: number;
	standbycode: number;
	drsecondarycode: number;
	performancestandbycode: number;
	sealedcode: number;
	uninitcode: number;
};
export type HealthCheckResponse = {
	initialized: boolean;
	sealed: boolean;
	standby: boolean;
	performance_standby: boolean;
	replication_performance_mode: string;
	replication_dr_mode: string;
	server_time_utc: number;
	version: string;
	cluster_name: string;
	cluster_id: string;
} | ErrorResponse;
export type SealStatusResponse = {
	type: string;
	initialized: boolean;
	sealed: boolean;
	t: number;
	n: number;
	progress: number;
	nonce: string;
	version: string;
	build_date: string;
	migration: boolean;
	cluster_name?: string;
	cluster_id?: string;
	recovery_seal: boolean;
	storage_type: string;
} | ErrorResponse;
export type SysHostInfoResponse = {
	cpu: Cpu[];
	cpu_times: CpuTime[];
	disk: Disk[];
	host: Host;
	memory: Memory;
	timestamp: string;
} | ErrorResponse;
export type SysCapabilitiesResponse = {
	capabilities: string[]
} | ErrorResponse;
export type SysCapabilitiesSelfResponse = {
	capabilities: string[];
	[key: string]: string[];
} | ErrorResponse;
export type SysInternalCountersResponse = {
	request_id: string;
	lease_id: string;
	renewable: boolean;
	lease_duration: number;
	data: {
		counters: {
			entities: {
				total: number;
			};
		};
	};
	wrap_info: string | null;
	warnings: string | null;
	auth: string | null;
} | ErrorResponse;
export type SysMetricsResponse = {} | ErrorResponse;
export type SysSealResponse = {} | ErrorResponse;
export type SysUnsealResponse = {
	sealed: boolean;
	t: number;
	n: number;
	progress: number;
	version: number;
	cluster_name?: string;
	cluster_version?: string;
} | ErrorResponse;
export type CreateTokenParams = {
	id?: string;
	role_name?: string;
	policies?: string;
	meta?: Record<string, unknown>;
	no_parent?: boolean;
	no_default_policy?: boolean;
	renewable?: boolean;
	ttl?: string;
	type?: string;
	explicit_max_ttl?: string;
	display_name?: string;
	num_uses?: number;
	period?: string;
	entity_alias?: string;
};
export type CreateTokenResponse = {
	client_token: string;
	accessor: string;
	policies: string[];
	token_policies: string[];
	metadata: {
		user: string
	};
	lease_duration: number;
	renewable: boolean;
	entity_id: string;
	token_type: string;
	orphan: boolean;
	num_uses: number
} | ErrorResponse;
export type RevokeTokenResponse = {} | ErrorResponse;
export type RevokeSelfTokenResponse = {} | ErrorResponse;
export type LookupTokenResponse = {
	accessor: string,
	creation_time: number;
	creation_ttl: number;
	display_name: string;
	entity_id: string;
	expire_time: string;
	explicit_max_ttl: number;
	id: string;
	identity_policies: string[];
	issue_time: string;
	meta: {
		username: string
	};
	num_uses: number;
	orphan: boolean;
	path: string;
	policies: string[];
	renewable: boolean;
	ttl: number;
} | ErrorResponse;
export type LookupSelfTokenResponse = {
	accessor: string,
	creation_time: number;
	creation_ttl: number;
	display_name: string;
	entity_id: string;
	expire_time: string;
	explicit_max_ttl: number;
	id: string;
	identity_policies: string[];
	issue_time: string;
	meta: {
		username: string
	};
	num_uses: number;
	orphan: boolean;
	path: string;
	policies: string[];
	renewable: boolean;
	ttl: number;
} | ErrorResponse;
export type RenewTokenResponse = {
	client_token: string;
	policies: string[];
	metadata: {
		user: string
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type RenewSelfTokenResponse = {
	client_token: string;
	policies: string[];
	metadata: {
		user: string
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type ListAccessorsResponse = {
	keys: string[];
} | ErrorResponse;
export type LookupAccessorResponse = {
	accessor: string,
	creation_time: number;
	creation_ttl: number;
	display_name: string;
	entity_id: string;
	expire_time: string;
	explicit_max_ttl: number;
	id: string;
	identity_policies: string[];
	issue_time: string;
	meta: {
		username: string
	};
	num_uses: number;
	orphan: boolean;
	path: string;
	policies: string[];
	renewable: boolean;
	ttl: number;
} | ErrorResponse;
export type RenewAccessorResponse = {
	client_token: string;
	policies: string[];
	metadata: {
		user: string
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type RevokeAccessorResponse = {} | ErrorResponse;
export type LoginWithLdapResponse = {
	client_token: string;
	policies: string[];
	metadata: {
		user: string
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type CreateLdapUserResponse = {} | ErrorResponse;
export type UpdateLdapUserResponse = {} | ErrorResponse;
export type CreateLdapGroupResponse = {} | ErrorResponse;
export type UpdateLdapGroupResponse = {} | ErrorResponse;
export type ReadLdapGroupResponse = {
	policies: string[]
} | ErrorResponse;
export type ReadLdapUserResponse = {
	policies: string[];
	groups: string;
} | ErrorResponse;
export type ListLdapUsersResponse = {
	keys: string[]
} | ErrorResponse;
export type ListLdapGroupsResponse = {
	keys: string[];
} | ErrorResponse;
export type DeleteLdapUserResponse = {} | ErrorResponse;
export type DeleteLdapGroupResponse = {} | ErrorResponse;
export type ReadLdapConfigResponse = {
	binddn: string;
	bindpass: string;
	certificate: string;
	deny_null_bind: boolean;
	discoverdn: boolean;
	groupattr: string;
	groupdn: string;
	groupfilter: string;
	insecure_tls: boolean;
	starttls: boolean;
	tls_max_version: string;
	tls_min_version: string;
	upndomain: string;
	url: string;
	username_as_alias: boolean;
	userattr: string;
	userdn: string;
} | ErrorResponse;
export type SetLdapConfigParams = {
	url?: string;
	case_sensitive_names?: boolean;
	request_timeout?: number;
	starttls?: boolean;
	tls_min_version?: string;
	tls_max_version?: string;
	insecure_tls?: boolean;
	certificate?: string;
	client_tls_cert?: string;
	client_tls_key?: string;
	binddn?: string;
	bindpass?: string;
	userdn?: string;
	userattr?: string;
	discoverdn?: boolean;
	deny_null_bind?: boolean;
	upndomain?: string;
	userfilter?: string;
	anonymous_group_search?: boolean;
	groupfilter?: string;
	groupdb?: string;
	groupattr?: string;
	username_as_alias?: boolean;
	token_ttl?: number;
	token_max_ttl?: number;
	token_policies?: string[];
	token_bound_cidrs?: string[];
	token_explicit_max_ttl?: number;
	token_no_default_policy?: boolean;
	token_num_uses?: number;
	token_period?: number;
	token_type?: string;
};
export type SetLdapConfigResponse = {
	binddn: string;
	deny_null_bind: boolean;
	discoverdn: boolean;
	groupattr: string;
	groupdn: string;
	groupfilter: string;
	insecure_tls: boolean;
	starttls: boolean;
	tls_max_version: string;
	tls_min_version: string;
	url: string;
	username_as_alias: boolean;
	userattr: string;
	userdn: string;
} | ErrorResponse;
export type LoginWithCertResponse = {
	client_token: string;
	policies: string[];
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type LoginWithUserpassResponse = {
	client_token: string;
	accessor: string;
	policies: string[];
	metadata: {
		username: string;
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type CreateUserpassUserResponse = {} | ErrorResponse;
export type UpdateUserpassUserResponse = {} | ErrorResponse;
export type ReadUserpassUserResponse = {
	max_ttl: number;
	policies: string[];
	ttl: number;
} | ErrorResponse;
export type DeleteUserpassUserResponse = {} | ErrorResponse;
export type UpdateUserpassPasswordResponse = {} | ErrorResponse;
export type UpdateUserpassPoliciesResponse = {} | ErrorResponse;
export type ListUserpassUsersResponse = {
	keys: string[];
} | ErrorResponse;
export type LoginWithK8sResponse = {
	client_token: string;
	accessor: string;
	policies: string[];
	metadata: {
		role: string;
		service_account_name: string;
		service_account_namespace: string;
		service_account_secret_name: string;
		service_account_uid: string;
	};
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type UpdateK8sConfigParams = {
	kubernetes_host?: string;
	kubernetes_ca_cert?: string;
	token_reviewer_kwt?: string;
	pem_keys?: string[];
	issuer?: string;
	disable_iss_validation?: boolean;
	disable_local_ca_jwt?: boolean;
};
export type UpdateK8sConfigResponse = {} | ErrorResponse;
export type ReadK8sConfigResponse = {
	kubernetes_host: string;
	kubernetes_ca_cert: string;
	pem_keys: string[];
	disable_local_ca_jwt: boolean;
} | ErrorResponse;
export type CreateK8sRoleParams = {
	bound_service_account_names?: Record<string, unknown>;
	bound_service_account_namespaces?: Record<string, unknown>;
	audience?: string;
	token_ttl?: string | number;
	token_max_ttl?: string | number;
	token_policies?: Record<string, unknown>;
	token_bound_cidrs?: Record<string, unknown>;
	token_explicit_max_ttl?: string | number;
	token_no_default_policy?: boolean;
	token_num_uses?: number;
	token_period?: string | number;
	token_type?: string;
};
export type CreateK8sRoleResponse = {} | ErrorResponse;
export type ReadK8sRoleResponse = {
	bound_service_account_names: string;
	bound_service_account_namespaces: string;
	max_ttl: number;
	ttl: number;
	period: number;
	policies: string[];
} | ErrorResponse;
export type ListK8sRolesResponse = {
	keys: string[];
} | ErrorResponse;
export type DeleteK8sRoleResponse = {} | ErrorResponse;
export type LoginWithAppRoleResponse = {
	client_token: string;
	accessor: string;
	token_policies: string[];
	metadata: Record<string, unknown> | null;
	lease_duration: number;
	renewable: boolean;
} | ErrorResponse;
export type GenerateAppRoleSecretIdResponse = {
	secret_id_accessor: string;
	secret_id: string;
	secret_id_ttl: number
} | ErrorResponse;
export type ReadAppRoleSecretIdResponse = {} | ErrorResponse;
export type DestroyAppRoleSecretIdResponse = {} | ErrorResponse;
export type ReadCACertificateResponse = {} | ErrorResponse;
export type ReadPkiCrlResponse = {} | ErrorResponse;
export type ReadCAChainResponse = {} | ErrorResponse;
export type ReadCertificateResponse = {} | ErrorResponse;
export type ListCertificatesResponse = {} | ErrorResponse;
export type SetCACertificateResponse = {} | ErrorResponse;
export type ReadCrlConfigResponse = {
	disable: boolean;
	expiry: string;
} | ErrorResponse;
export type SetCrlConfigResponse = {} | ErrorResponse;
export type ReadPkiUrlsResponse = {} | ErrorResponse;
export type SetPkiUrlsResponse = {} | ErrorResponse;
export type RotatePkiCrlResponse = {
	success: boolean;
} | ErrorResponse;
export type GenerateRootCAParams = {
	type: "internal" | "exported";
	commonName: string;
	altNames?: string;
	ipSans?: string;
	uriSans?: string;
	otherSans?: string;
	ttl?: string;
	format?: CertificateFormat | "pem_bundle";
	pkFormat?: PKFormat;
	keyType?: KeyType;
	keyBits?: number;
	excludeCnFromSans?: boolean;
	maxPathLength?: number;
	permittedDnsDomains?: string;
	ou?: string;
	organization?: string;
	country?: string;
	locality?: string;
	province?: string;
	streetAddress?: string;
	postalCode?: string;
	serialNumber?: string;
};
export type GenerateRootCAResponse = {
	expiration: string;
	certificate: string;
	issuing_ca: string;
	serial_number: string;
	issuer_id: string;
	issuer_name: string;
	key_id: string;
	key_name: string;
} | ErrorResponse;
export type DeleteRootCAResponse = {} | ErrorResponse;
export type GenIntermediateCAParams = {
	type: "internal" | "exported";
	commonName: string;
	altNames?: string;
	ipSans?: string;
	uriSans?: string;
	otherSans?: string;
	format?: CertificateFormat | "pem_bundle";
	pkFormat?: PKFormat;
	keyType?: KeyType;
	keyBits?: number;
	excludeCnFromSans?: boolean;
	ou?: string;
	organization?: string;
	country?: string;
	locality?: string;
	province?: string;
	streetAddress?: string;
	postalCode?: string;
	serialNumber?: string;
};
export type GenIntermediateCAResponse = {
	csr: string;
	private_key: string;
	private_key_type: KeyType;
} | ErrorResponse;
export type SignIntermediateCAParams = {
	csr: string;
	commonName: string;
	altNames?: string;
	ipSans?: string;
	uriSans?: string;
	otherSans?: string;
	ttl?: string;
	format?: CertificateFormat | "pem_bundle";
	maxPathLength?: number;
	excludeCnFromSans?: boolean;
	useCsrValues?: boolean;
	permittedDnsDomains?: string;
	ou?: string;
	organization?: string;
	country?: string;
	locality?: string;
	province?: string;
	streetAddress?: string;
	postalCode?: string;
	serialNumber?: string;
};
export type SignIntermediateCAResponse = {
	certificate: string;
	issuing_ca: string;
	ca_chain: string[];
	serial_number: string;
} | ErrorResponse;
export type SetIntermediateCAResponse = {} | ErrorResponse;
export type GenPkiCertificateParams = {
	role: "internal" | "exported";
	commonName: string;
	altNames?: string;
	ipSans?: string;
	uriSans?: string;
	otherSans?: string;
	ttl?: string;
	format?: CertificateFormat | "pem_bundle";
	pkFormat?: PKFormat;
	excludeCnFromSans?: boolean;
};
export type GenPkiCertificateResponse = {
	certificate: string;
	issuing_ca: string;
	ca_chain: string[];
	private_key: string;
	private_key_type: KeyType;
	serial_number: string;
} | ErrorResponse;
export type RevokePkiCertificateResponse = {
	revocation_time: number;
} | ErrorResponse;
export type CreatePkiRoleParams = {
	name: string;
	ttl?: string;
	maxTtl?: string;
	allowLocalhost?: boolean;
	allowedDomains?: string[];
	allowedDomainsTemplate?: boolean;
	allowBareDomains?: boolean;
	allowSubdomains?: boolean;
	allowGlobDomains?: boolean;
	allowAnyName?: boolean;
	enforceHostnames?: boolean;
	allowIpSans?: string;
	allowedUriSans?: string;
	allowedOtherSans?: string;
	serverFlag?: boolean;
	clientFlag?: boolean;
	codeSigningFlag?: boolean;
	emailProtectionFlag?: boolean;
	keyType?: KeyType;
	keyBits?: number;
	keyUsage?: string[];
	externalKeyUsage?: string[];
	extKeyUsageOids?: string;
	useCsrCommonName?: boolean;
	useCsrSans?: boolean;
	ou?: string;
	organization?: string;
	country?: string;
	locality?: string;
	province?: string;
	streetAddress?: string;
	postalCode?: string;
	serialNumber?: string;
	generateLease?: boolean;
	noStore?: boolean;
	requireCn?: boolean;
	policyIdentifiers?: string[];
	basicConstraintsValidForNonCa?: boolean;
	notBeforeDuration?: string;
};
export type CreatePkiRoleResponse = {} | ErrorResponse;
export type UpdatePkiRoleParams = {
	name: string;
	ttl?: string;
	maxTtl?: string;
	allowLocalhost?: boolean;
	allowedDomains?: string[];
	allowedDomainsTemplate?: boolean;
	allowBareDomains?: boolean;
	allowSubdomains?: boolean;
	allowGlobDomains?: boolean;
	allowAnyName?: boolean;
	enforceHostnames?: boolean;
	allowIpSans?: string;
	allowedUriSans?: string;
	allowedOtherSans?: string;
	serverFlag?: boolean;
	clientFlag?: boolean;
	codeSigningFlag?: boolean;
	emailProtectionFlag?: boolean;
	keyType?: KeyType;
	keyBits?: number;
	keyUsage?: string[];
	externalKeyUsage?: string[];
	extKeyUsageOids?: string;
	useCsrCommonName?: boolean;
	useCsrSans?: boolean;
	ou?: string;
	organization?: string;
	country?: string;
	locality?: string;
	province?: string;
	streetAddress?: string;
	postalCode?: string;
	serialNumber?: string;
	generateLease?: boolean;
	noStore?: boolean;
	requireCn?: boolean;
	policyIdentifiers?: string[];
	basicConstraintsValidForNonCa?: boolean;
	notBeforeDuration?: string;
};
export type UpdatePkiRoleResponse = {} | ErrorResponse;
export type ReadPkiRoleResponse = {
	allow_any_name: boolean;
	allow_bare_domains: boolean;
	allow_glob_domains: boolean;
	allow_ip_sans: boolean;
	allow_localhost: boolean;
	allow_subdomains: boolean;
	allow_token_displayname: boolean;
	allow_wildcard_certificates: boolean;
	allowed_domains: string[];
	allowed_domains_template: boolean;
	allowed_other_sans: string[];
	allowed_serial_numbers: string[];
	allowed_uri_sans: string[];
	allowed_uri_sans_template: boolean;
	basic_constraints_valid_for_non_ca: boolean;
	client_flag: boolean;
	code_signing_flag: boolean;
	country: string[];
	email_protection_flag: boolean;
	enforce_hostnames: boolean;
	ext_key_usage: string[];
	ext_key_usage_oids: string[];
	generate_lease: boolean;
	key_bits: number;
	key_type: KeyType;
	key_usage: string[];
	locality: string[];
	max_ttl: number;
	no_store: boolean;
	not_after: string;
	not_before_duration: number;
	organization: string[];
	ou: string[];
	policy_identifiers: string[];
	postal_code: string[];
	province: string[];
	require_cn: boolean;
	server_flag: boolean;
	signature_bits: number;
	street_address: string[];
	ttl: number;
	use_csr_common_name: boolean;
	use_csr_sans: boolean;
} | ErrorResponse;
export type ListPkiRolesResponse = {
	keys: string[];
} | ErrorResponse;
export type DeletePkiRolesResponse = {} | ErrorResponse;
export type SetADConfigParams = {
	ttl?: number;
	max_ttl?: number;
	password_policy?: string;
	url?: string
	request_timeout?: string;
	starttls?: boolean;
	insecure_tls?: boolean;
	certificate?: string;
	binddn: string;
	bindpass: string;
	userdn?: string;
	upndomain?: string;
	last_rotation_tolerance?: string;
};
export type SetADConfigResponse = {} | ErrorResponse;
export type UpdateADConfigParams = {
	ttl?: number;
	max_ttl?: number;
	password_policy?: string;
	url?: string
	request_timeout?: string;
	starttls?: boolean;
	insecure_tls?: boolean;
	certificate?: string;
	binddn: string;
	bindpass: string;
	userdn?: string;
	upndomain?: string;
	last_rotation_tolerance?: string;
};
export type UpdateADConfigResponse = {} | ErrorResponse;
export type ReadADConfigResponse = {} | ErrorResponse;
export type DeleteADConfigResponse = {} | ErrorResponse;
export type ListADRolesResponse = {} | ErrorResponse;
export type CreateADRolesParams = {
	name: string;
	service_account_name: string;
	ttl?: string;
}
export type CreateADRolesResponse = {} | ErrorResponse;
export type UpdateADRoleParams = {
	name: string;
	service_account_name: string;
	ttl?: string;
};
export type UpdateADRoleResponse = {} | ErrorResponse;
export type ReadADRoleResponse = {} | ErrorResponse;
export type DeleteADRoleResponse = {} | ErrorResponse;
export type GetADRoleCredResponse = {} | ErrorResponse;
export type RotateADRoleCredResponse = {} | ErrorResponse;
export type ListADLibrariesResponse = {} | ErrorResponse;
export type ReadADLibraryResponse = {
	service_account_names: string[];
	ttl: string;
	max_ttl: string;
	disable_check_in_enforcement: boolean;
} | ErrorResponse;
export type CreateADLibraryParams = {
	name: string;
	service_account_names: string[];
	ttl?: string;
	max_ttl?: string;
	disable_check_in_enforcement?: boolean;
};
export type CreateADLibraryResponse = {} | ErrorResponse;
export type UpdateADLibraryParams = {
	name: string;
	service_account_names: string[];
	ttl?: string;
	max_ttl?: string;
	disable_check_in_enforcement?: boolean;
};
export type UpdateADLibraryResponse = {} | ErrorResponse;
export type DeleteADLibraryResponse = {} | ErrorResponse;
export type CheckADCredOutParams = {
	name: string;
	ttl?: string;
};
export type CheckADCredOutResponse = {} | ErrorResponse;
export type CheckADCredInParams = {
	name: string;
	service_account_names?: string[];
};
export type CheckADCredInResponse = {} | ErrorResponse;
export type GetADCredSatusResponse = {} | ErrorResponse;
export type UpdateKVEngineConfigResponse = {} | ErrorResponse;
export type ReadKVEngineConfigResponse = {
	cas_required: false;
	delete_version_after: string;
	max_versions: number;
} | ErrorResponse;
export type CreateKVSecretResponse = {
	created_time: string;
	custom_metadata: Record<string, unknown>;
	deletion_time: string;
	destroyed: boolean;
	version: number;
} | ErrorResponse;
export type UpdateKVSecretResponse = {
	created_time: string;
	custom_metadata: Record<string, unknown>;
	deletion_time: string;
	destroyed: boolean;
	version: number;
} | ErrorResponse;
export type ReadKVSecretResponse = {
	data: Record<string, unknown>;
	metadata: {
		created_time: string;
		custom_metadata: Record<string, unknown> | null;
		deletion_time: string;
		destroyed: boolean;
		version: number;
	}
} | ErrorResponse;
export type DeleteLatestVerKVSecretResponse = {} | ErrorResponse;
export type DeleteVersionsKVSecretResponse = {} | ErrorResponse;
export type UndeleteVersionsKVSecretResponse = {} | ErrorResponse;
export type DestroyVersionsKVSecretResponse = {} | ErrorResponse;
export type EliminateKVSecretResponse = {} | ErrorResponse;
export type ListKVSecretsResponse = {
	keys: string[];
} | ErrorResponse;

declare module "hashi-vault-js" {
	class Vault {
		private https: boolean;
		private cert: string;
		private key: string;
		private cacert: string;
		private baseUrl: string;
		private rootPath: string;
		private timeout: string | number;
		private proxy: AxiosProxyConfig | boolean;
		private namespace: string;
		private instance: Axios;
		private agent: Agent | boolean;

		constructor(params: VaultConfig)
		healthCheck(params?: Partial<HealthCheckParams>): Promise<HealthCheckResponse>;
		sealStatus(): Promise<SealStatusResponse>;
		sysHostInfo(sudoToken: string): Promise<SysHostInfoResponse>;
		sysCapabilities(sudoToken: string, token: string, paths: string[]): Promise<SysCapabilitiesResponse>;
		sysCapabilitiesSelf(token: string, paths: string[]): Promise<SysCapabilitiesSelfResponse>;
		sysInternalCounters(sudoToken: string, type: string): Promise<SysInternalCountersResponse>;
		sysMetrics(sudoToken: string, type: string): Promise<SysMetricsResponse>;
		sysSeal(sudoToken: string): Promise<SysSealResponse>;
		sysUnseal(sudoToken: string, key: string, reset: boolean, migrate: boolean): Promise<SysUnsealResponse>;
		createToken(vaultToken: string, params: CreateTokenParams): Promise<CreateTokenResponse>;
		revokeToken(vaultToken: string, clientToken: string): Promise<RevokeTokenResponse>;
		revokeSelfToken(clientToken: string): Promise<RevokeSelfTokenResponse>;
		lookupToken(vaultToken: string, clientToken: string): Promise<LookupTokenResponse>;
		lookupSelfToken(clientToken: string): Promise<LookupSelfTokenResponse>;
		renewToken(vaultToken: string, clientToken: string, increment: string): Promise<RenewTokenResponse>;
		renewSelfToken(clientToken: string, increment: string): Promise<RenewSelfTokenResponse>;
		listAccessors(sudoToken: string): Promise<ListAccessorsResponse>;
		lookupAccessor(sudoToken: string, accessor: string): Promise<LookupAccessorResponse>;
		renewAccessor(vaultToken: string, accessor: string, increment: string): Promise<RenewAccessorResponse>;
		revokeAccessor(vaultToken: string, accessor: string): Promise<RevokeAccessorResponse>;
		loginWithLdap(username: string, password: string, mount?: string): Promise<LoginWithLdapResponse>;
		createLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string): Promise<CreateLdapUserResponse>;
		updateLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string): Promise<UpdateLdapUserResponse>;
		createLdapGroup(token: string, group: string, policies: string[], mount?: string): Promise<CreateLdapGroupResponse>;
		updateLdapGroup(token: string, group: string, policies: string[], mount?: string): Promise<UpdateLdapGroupResponse>;
		readLdapGroup(token: string, group: string, mount?: string): Promise<ReadLdapGroupResponse>;
		readLdapUser(token: string, username: string, mount?: string): Promise<ReadLdapUserResponse>;
		listLdapUsers(token: string, mount?: string): Promise<ListLdapUsersResponse>;
		listLdapGroups(token: string, mount?: string): Promise<ListLdapGroupsResponse>;
		deleteLdapUser(token: string, username: string, mount?: string): Promise<DeleteLdapUserResponse>;
		deleteLdapGroup(token: string, group: string, mount?: string): Promise<DeleteLdapGroupResponse>;
		readLdapConfig(token: string, mount?: string): Promise<ReadLdapConfigResponse>;
		setLdapConfig(token: string, params: SetLdapConfigParams, mount?: string): Promise<SetLdapConfigResponse>;
		loginWithCert(certName: string, mount?: string): Promise<LoginWithCertResponse>;
		loginWithUserpass(username: string, password: string, mount?: string): Promise<LoginWithUserpassResponse>;
		createUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string): Promise<CreateUserpassUserResponse>;
		updateUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string): Promise<UpdateUserpassUserResponse>;
		readUserpassUser(token: string, username: string, mount?: string): Promise<ReadUserpassUserResponse>;
		deleteUserpassUser(token: string, username: string, mount?: string): Promise<DeleteUserpassUserResponse>;
		updateUserpassPassword(token: string, username: string, password: string, mount?: string): Promise<UpdateUserpassPasswordResponse>;
		updateUserpassPolicies(token: string, username: string, policies: string[], mount?: string): Promise<UpdateUserpassPoliciesResponse>;
		listUserpassUsers(token: string, mount?: string): Promise<ListUserpassUsersResponse>;
		loginWithK8s(role: string, jwt: string, mount?: string): Promise<LoginWithK8sResponse>;
		updateK8sConfig(token: string, params: UpdateK8sConfigParams, mount?: string): Promise<UpdateK8sConfigResponse>;
		readK8sConfig(token: string, mount?: string): Promise<ReadK8sConfigResponse>;
		createK8sRole(token: string, role: string, params: CreateK8sRoleParams, mount?: string): Promise<CreateK8sRoleResponse>;
		readK8sRole(token: string, role: string, mount?: string): Promise<ReadK8sRoleResponse>;
		listK8sRoles(token: string, mount?: string): Promise<ListK8sRolesResponse>;
		deleteK8sRole(token: string, role: string, mount?: string): Promise<DeleteK8sRoleResponse>;
		loginWithAppRole(roleId: string, secretId: string, mount?: string): Promise<LoginWithAppRoleResponse>;
		generateAppRoleSecretId(token: string, appRole: string, metadata?: string, mount?: string): Promise<GenerateAppRoleSecretIdResponse>;
		readAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string): Promise<ReadAppRoleSecretIdResponse>;
		destroyAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string): Promise<DestroyAppRoleSecretIdResponse>;
		readCACertificate(format: CertificateFormat, mount?: string): Promise<ReadCACertificateResponse>;
		readPkiCrl(format: CertificateFormat, mount?: string): Promise<ReadPkiCrlResponse>;
		readCAChain(mount?: string): Promise<ReadCAChainResponse>;
		readCertificate(serial: string, mount?: string): Promise<ReadCertificateResponse>;
		listCertificates(token: string, mount?: string): Promise<ListCertificatesResponse>;
		setCACertificate(token: string, pemBundle: string, mount?: string): Promise<SetCACertificateResponse>;
		readCrlConfig(token: string, mount?: string): Promise<ReadCrlConfigResponse>;
		setCrlConfig(token: string, expiry: string, disable: boolean, mount?: string): Promise<SetCrlConfigResponse>;
		readPkiUrls(token: string, mount?: string): Promise<ReadPkiUrlsResponse>;
		setPkiUrls(token: string, issuingCertificates: string[], crlDistributionPoints: string[], oscpServers: string[], mount?: string): Promise<SetPkiUrlsResponse>;
		rotatePkiCrl(token: string, mount?: string): Promise<RotatePkiCrlResponse>;
		generateRootCA(sudoToken: string, params: GenerateRootCAParams, mount?: string): Promise<GenerateRootCAResponse>;
		deleteRootCA(sudoToken: string, mount?: string): Promise<DeleteRootCAResponse>;
		genIntermediateCA(token: string, params: GenIntermediateCAParams, mount?: string): Promise<GenIntermediateCAResponse>;
		signIntermediateCA(sudoToken: string, params: SignIntermediateCAParams, mount?: string): Promise<SignIntermediateCAResponse>;
		setIntermediateCA(token: string, certificate: string, mount?: string): Promise<SetIntermediateCAResponse>;
		genPkiCertificate(token: string, params: GenPkiCertificateParams, mount?: string): Promise<GenPkiCertificateResponse>;
		revokePkiCertificate(token: string, serialNumber: string, mount?: string): Promise<RevokePkiCertificateResponse>;
		createPkiRole(token: string, params: CreatePkiRoleParams, mount?: string): Promise<CreatePkiRoleResponse>;
		updatePkiRole(token: string, params: UpdatePkiRoleParams, mount?: string): Promise<UpdatePkiRoleResponse>;
		readPkiRole(token: string, name: string, mount?: string): Promise<ReadPkiRoleResponse>;
		listPkiRoles(token: string, mount?: string): Promise<ListPkiRolesResponse>;
		deletePkiRoles(token: string, name: string, mount?: string): Promise<DeletePkiRolesResponse>;
		setADConfig(token: string, params: SetADConfigParams, mount?: string): Promise<SetADConfigResponse>;
		updateADConfig(token: string, params: UpdateADConfigParams, mount?: string): Promise<UpdateADConfigResponse>;
		readADConfig(token: string, mount?: string): Promise<ReadADConfigResponse>;
		deleteADConfig(token: string, mount?: string): Promise<DeleteADConfigResponse>;
		listADRoles(token: string, mount?: string): Promise<ListADRolesResponse>;
		createADRoles(token: string, params: CreateADRolesParams, mount?: string): Promise<CreateADRolesResponse>;
		updateADRole(token: string, params: UpdateADRoleParams, mount?: string): Promise<UpdateADRoleResponse>;
		readADRole(token: string, roleName: string, mount?: string): Promise<ReadADRoleResponse>;
		deleteADRole(token: string, roleName: string, mount?: string): Promise<DeleteADRoleResponse>;
		getADRoleCred(token: string, roleName: string, mount?: string): Promise<GetADRoleCredResponse>;
		rotateADRoleCred(token: string, roleName: string, mount?: string): Promise<RotateADRoleCredResponse>;
		listADLibraries(token: string, mount?: string): Promise<ListADLibrariesResponse>;
		readADLibrary(token: string, setName: string, mount?: string): Promise<ReadADLibraryResponse>;
		createADLibrary(token: string, params: CreateADLibraryParams, mount?: string): Promise<CreateADLibraryResponse>;
		updateADLibrary(token: string, params: UpdateADLibraryParams, mount?: string): Promise<UpdateADLibraryResponse>;
		deleteADLibrary(token: string, setName: string, mount?: string): Promise<DeleteADLibraryResponse>;
		checkADCredOut(token: string, params: CheckADCredOutParams, mount?: string): Promise<CheckADCredOutResponse>;
		checkADCredInt(token: string, params: CheckADCredInParams, forceMode: boolean, mount?: string): Promise<CheckADCredInResponse>;
		getADCredSatus(token: string, setName: string, mount?: string): Promise<GetADCredSatusResponse>;
		updateKVEngineConfig(token: string, data: Record<string, unknown>, mount?: string): Promise<UpdateKVEngineConfigResponse>;
		readKVEngineConfig(token: string, mount?: string): Promise<ReadKVEngineConfigResponse>;
		createKVSecret(token: string, name: string, secrets: Record<string, unknown>, mount?: string): Promise<CreateKVSecretResponse>;
		updateKVSecret(token: string, name: string, secrets: Record<string, unknown>, version: number, mount?: string): Promise<UpdateKVSecretResponse>;
		readKVSecret(token: string, name: string, version?: number, mount?: string): Promise<ReadKVSecretResponse>;
		deleteLatestVerKVSecret(token: string, name: string, mount?: string): Promise<DeleteLatestVerKVSecretResponse>;
		deleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): Promise<DeleteVersionsKVSecretResponse>;
		undeleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): Promise<UndeleteVersionsKVSecretResponse>;
		destroyVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): Promise<DestroyVersionsKVSecretResponse>;
		eliminateKVSecret(token: string, name: string, mount?: string): Promise<EliminateKVSecretResponse>;
		listKVSecrets(token: string, folder?: string, mount?: string): Promise<ListKVSecretsResponse>;
	}

	export = Vault;
}
