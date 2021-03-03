import Cookies from 'universal-cookie';
export interface PartialOptions {
    cookie?: {
        name?: string;
        path?: string;
        domain?: string;
        maxAge?: number;
        secure?: boolean;
    };
}
export interface Options {
    cookie: {
        name: string;
        path: string;
        domain?: string;
        maxAge: number;
        secure: boolean;
    };
}
export declare class Store {
    protected _options: Options;
    protected _cookies: Cookies;
    services: Service[];
    isDeclineAll: boolean;
    isAcceptAll: boolean;
    noCookie: boolean | undefined;
    protected initConsents: string[];
    constructor(options: PartialOptions);
    initialize(): void;
    addService(options: ServiceOptions): boolean;
    accept(id: string): void;
    decline(id: string): void;
    acceptAll(): void;
    declineAll(): void;
    get consents(): string[];
    protected loadTokenFromCookie(): void;
    protected findService(id: string): Service | undefined;
    protected saveConsentsInCookie(): void;
}
export interface ServiceOptions {
    id: string;
    needConsent: boolean;
    type: string;
    name: string;
    cookies?: string[];
    onAccept?: () => void;
    onDecline?: () => void;
}
export declare class Service {
    protected _options: ServiceOptions;
    consent: boolean | undefined;
    constructor(options: ServiceOptions);
    get id(): string;
    get needConsent(): boolean;
    get name(): string;
    get type(): string;
    get cookies(): string[];
    accept(): void;
    decline(): void;
}
