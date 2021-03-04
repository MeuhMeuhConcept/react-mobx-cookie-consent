import { action, observable, computed, toJS } from 'mobx'
import Cookies, { CookieSetOptions } from 'universal-cookie'
import { merge } from 'lodash'

export interface PartialStoreOptions {
    cookies?: string
    cookie?: {
        name?: string
        path?: string
        domain?: string
        maxAge?: number
        secure?: boolean
    }
}

export interface StoreOptions {
    cookie: {
        name: string
        path: string
        domain?: string
        maxAge: number
        secure: boolean
    }
}

export class Store {
    protected _options: StoreOptions
    protected _cookies: Cookies
    @observable services: Service[] = []
    @observable isDeclineAll: boolean = false
    @observable isAcceptAll: boolean = false
    @observable noCookie: boolean | undefined = undefined
    protected initConsents: string[] = []

    @observable dialogIsOpened: boolean = false

    constructor(options: PartialStoreOptions) {
        this._options = merge(
            {
                cookie: {
                    name: 'rmcc',
                    path: '/',
                    maxAge: 365 * 24 * 60 * 60,
                    secure: true
                }
            } as StoreOptions,
            options
        )

        this._cookies = new Cookies(options.cookies)
    }

    public initialization (): void {
        this.initialize() //For react-mobx-store-container compatibility
    }

    @action
    public initialize (): void {
        this.loadTokenFromCookie()

        this.dialogIsOpened = this.noCookie === true && this.nbNeedConcentServices > 0
    }

    @action
    public toggleDialog (): void {
        console.log('toggle')
        this.dialogIsOpened = !this.dialogIsOpened
    }

    @action
    public addService (options: ServiceOptions): boolean {
        const already = this.findService(options.id)

        if (already) {
            return false
        }

        const service = new Service(options)

        if (this.isAcceptAll || this.initConsents.indexOf(service.id) >= 0) {
            service.accept()
        }

        this.services.push(service)

        return true
    }

    @action
    public accept(id: string): void {
        const service = this.findService(id)

        if (service) {
            service.accept()
        }
    }

    @action
    public decline(id: string): void {
        const service = this.findService(id)

        if (service) {
            service.decline()
        }
    }

    @action
    public acceptAll(): void {
        for (const service of this.services) {
            service.accept()
        }

        this.isAcceptAll = true
        this.isDeclineAll = false

        this.saveConsentsInCookie()

        this.dialogIsOpened = false
    }

    @action
    public declineAll(): void {
        for (const service of this.services) {
            service.decline()
        }

        this.isAcceptAll = false
        this.isDeclineAll = true

        this.saveConsentsInCookie()

        this.dialogIsOpened = false
    }

    @computed
    public get consents (): string[] {
        const consents: string[] = []

        for (const service of this.services) {
            if (service.consent) {
                consents.push(service.id)
            }
        }

        return consents
    }

    @action
    protected loadTokenFromCookie (): void {
        const cookie = this._cookies.get(this._options.cookie.name)

        if (cookie === undefined) {
            this.noCookie = true
            return
        }

        this.noCookie = false

        this.initConsents = cookie.split('|')

        for (const id of this.initConsents) {
            const service = this.findService(id)
            if (service) {
                service.accept()
            }
        }
    }

    @computed
    public get nbNeedConcentServices (): number {
        return (this.services.filter((s: Service) => s.needConsent)).length
    }

    protected findService (id: string): Service | undefined {
        for (const service of this.services) {
            if (service.id === id) {
                return service
            }
        }
    }

    protected saveConsentsInCookie (): void {
        const options: CookieSetOptions = {
            path: this._options.cookie.path,
            domain: this._options.cookie.domain,
            maxAge: this._options.cookie.maxAge,
            secure: this._options.cookie.secure,
        }

        this._cookies.set(this._options.cookie.name, this.consents.join('|'), options)

        this.noCookie = false
    }
}

export interface ServiceDefinition {
    id: string
    needConsent: boolean
    type: string
    name: string
    cookies?: string[]
}

export interface ServiceOptions extends ServiceDefinition {
    onAccept?: () => void
    onDecline?: () => void
}

export class Service implements ServiceDefinition {
    protected _options: ServiceOptions
    @observable consent: boolean | undefined

    constructor(options: ServiceOptions) {
        this._options = options
    }

    public get id (): string {
        return this._options.id
    }

    public get needConsent (): boolean {
        return this._options.needConsent
    }

    public get type (): string {
        return this._options.type
    }

    public get name (): string {
        return this._options.name
    }

    public get cookies (): string[] {
        return this._options.cookies ? this._options.cookies : []
    }

    public get definition (): ServiceDefinition {
        return {
            id: this.id,
            needConsent: this.needConsent,
            type: this.type,
            name: this.name,
            cookies: this.cookies
        }
    }

    @action
    public accept(): void {
        if (this.consent) {
            return
        }

        this.consent = true

        if (this._options.onAccept) {
            this._options.onAccept()
        }
    }

    @action
    public decline(): void {
        if (!this.consent) {
            return
        }

        this.consent = false

        if (this._options.onDecline) {
            this._options.onDecline()
        }
    }
}
