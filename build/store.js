"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Store = void 0;
const mobx_1 = require("mobx");
const universal_cookie_1 = require("universal-cookie");
class Store {
    constructor(options) {
        this.services = [];
        this.isDeclineAll = false;
        this.isAcceptAll = false;
        this.noCookie = undefined;
        this.initConsents = [];
        this._options = Object.assign({
            cookie: {
                name: 'rmcc',
                path: '/',
                maxAge: 365 * 24 * 60 * 60,
                secure: true
            }
        }, options);
        this._cookies = new universal_cookie_1.default();
    }
    initialize() {
        this.loadTokenFromCookie();
    }
    addService(options) {
        const already = this.findService(options.id);
        if (already) {
            return false;
        }
        const service = new Service(options);
        if (this.isAcceptAll || this.initConsents.indexOf(service.id) >= 0) {
            service.accept();
        }
        this.services.push(service);
        return true;
    }
    accept(id) {
        const service = this.findService(id);
        if (service) {
            service.accept();
        }
    }
    decline(id) {
        const service = this.findService(id);
        if (service) {
            service.decline();
        }
    }
    acceptAll() {
        for (const service of this.services) {
            service.accept();
        }
        this.isAcceptAll = true;
        this.isDeclineAll = false;
        this.saveConsentsInCookie();
    }
    declineAll() {
        for (const service of this.services) {
            service.decline();
        }
        this.isAcceptAll = false;
        this.isDeclineAll = true;
        this.saveConsentsInCookie();
    }
    get consents() {
        const consents = [];
        for (const service of this.services) {
            if (service.consent) {
                consents.push(service.id);
            }
        }
        return consents;
    }
    loadTokenFromCookie() {
        const cookie = this._cookies.get(this._options.cookie.name);
        if (!cookie) {
            this.noCookie = true;
            return;
        }
        this.noCookie = false;
        this.initConsents = cookie.split('|');
        for (const id of this.initConsents) {
            const service = this.findService(id);
            if (service) {
                service.accept();
            }
        }
    }
    findService(id) {
        for (const service of this.services) {
            if (service.id === id) {
                return service;
            }
        }
    }
    saveConsentsInCookie() {
        const options = {
            path: this._options.cookie.path,
            domain: this._options.cookie.domain,
            maxAge: this._options.cookie.maxAge,
            secure: this._options.cookie.secure,
        };
        this._cookies.set(this._options.cookie.name, this.consents.join('|'), options);
    }
}
__decorate([
    mobx_1.observable
], Store.prototype, "services", void 0);
__decorate([
    mobx_1.observable
], Store.prototype, "isDeclineAll", void 0);
__decorate([
    mobx_1.observable
], Store.prototype, "isAcceptAll", void 0);
__decorate([
    mobx_1.observable
], Store.prototype, "noCookie", void 0);
__decorate([
    mobx_1.action
], Store.prototype, "addService", null);
__decorate([
    mobx_1.action
], Store.prototype, "accept", null);
__decorate([
    mobx_1.action
], Store.prototype, "decline", null);
__decorate([
    mobx_1.action
], Store.prototype, "acceptAll", null);
__decorate([
    mobx_1.action
], Store.prototype, "declineAll", null);
__decorate([
    mobx_1.computed
], Store.prototype, "consents", null);
__decorate([
    mobx_1.action
], Store.prototype, "loadTokenFromCookie", null);
exports.Store = Store;
class Service {
    constructor(options) {
        this._options = options;
    }
    get id() {
        return this._options.id;
    }
    get needConsent() {
        return this._options.needConsent;
    }
    get name() {
        return this._options.name;
    }
    get type() {
        return this._options.type;
    }
    get cookies() {
        return this._options.cookies ? this._options.cookies : [];
    }
    accept() {
        if (this.consent) {
            return;
        }
        this.consent = true;
        if (this._options.onAccept) {
            this._options.onAccept();
        }
    }
    decline() {
        if (!this.consent) {
            return;
        }
        this.consent = false;
        if (this._options.onDecline) {
            this._options.onDecline();
        }
    }
}
__decorate([
    mobx_1.observable
], Service.prototype, "consent", void 0);
__decorate([
    mobx_1.action
], Service.prototype, "accept", null);
__decorate([
    mobx_1.action
], Service.prototype, "decline", null);
exports.Service = Service;
