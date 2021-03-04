import Cookies from 'universal-cookie';
export interface PartialStoreOptions {
    cookies?: string;
    cookie?: {
        name?: string;
        path?: string;
        domain?: string;
        maxAge?: number;
        secure?: boolean;
    };
}
export interface StoreOptions {
    cookie: {
        name: string;
        path: string;
        domain?: string;
        maxAge: number;
        secure: boolean;
    };
}
export declare class Store {
    protected _options: StoreOptions;
    protected _cookies: Cookies;
    services: Service[];
    isDeclineAll: boolean;
    isAcceptAll: boolean;
    noCookie: boolean | undefined;
    protected initConsents: string[];
    dialogIsOpened: boolean;
    constructor(options: PartialStoreOptions);
    initialization(): void;
    initialize(): void;
    toggleDialog(): void;
    addService(options: ServiceOptions): boolean;
    accept(id: string): void;
    decline(id: string): void;
    acceptAll(): void;
    declineAll(): void;
    get consents(): string[];
    protected loadTokenFromCookie(): void;
    get nbNeedConcentServices(): number;
    protected findService(id: string): Service | undefined;
    protected saveConsentsInCookie(): void;
}
export interface ServiceDefinition {
    id: string;
    needConsent: boolean;
    type: string;
    name: string;
    cookies?: string[];
}
export interface ServiceOptions extends ServiceDefinition {
    onAccept?: () => void;
    onDecline?: () => void;
}
export declare class Service implements ServiceDefinition {
    protected _options: ServiceOptions;
    consent: boolean | undefined;
    constructor(options: ServiceOptions);
    get id(): string;
    get needConsent(): boolean;
    get type(): string;
    get name(): string;
    get cookies(): string[];
    get definition(): ServiceDefinition;
    accept(): void;
    decline(): void;
}
