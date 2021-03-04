"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
class Dialog extends React.Component {
    constructor() {
        super(...arguments);
        this.onDeclineClickHandler = () => {
            const { store } = this.props;
            store.declineAll();
        };
        this.onAcceptClickHandler = () => {
            const { store } = this.props;
            store.acceptAll();
        };
        this.onCustomizeClickHandler = () => {
            console.log('comming soon...');
        };
    }
    render() {
        const { store } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Modal, { isOpen: store.dialogIsOpened, centered: true, toggle: store.noCookie !== true ? () => store.toggleDialog() : undefined },
                React.createElement(reactstrap_1.ModalHeader, { className: "cookie-consent-dialog-body", toggle: store.noCookie !== true ? () => store.toggleDialog() : undefined }, this.renderModalHeader()),
                React.createElement(reactstrap_1.ModalBody, { className: "cookie-consent-dialog-body" }, this.renderModalBody()),
                React.createElement(reactstrap_1.ModalFooter, { className: "cookie-consent-dialog-footer" },
                    React.createElement("button", { onClick: this.onAcceptClickHandler, className: "cookie-consent-dialog-btn-accept" }, this.renderButtonAcceptAll()),
                    React.createElement("button", { onClick: this.onDeclineClickHandler, className: "cookie-consent-dialog-btn-decline" }, this.renderButtonDeclineAll()),
                    this.props.enableCustomization && (React.createElement("button", { onClick: this.onCustomizeClickHandler, className: "cookie-consent-dialog-btn-customize" }, this.renderButtonCustomize())))));
    }
    renderModalHeader() {
        return 'Cookie Consent ?';
    }
    renderModalBody() {
        return null;
    }
    renderButtonAcceptAll() {
        return 'Accept all';
    }
    renderButtonDeclineAll() {
        return 'Decline all';
    }
    renderButtonCustomize() {
        return 'Customize';
    }
}
exports.Dialog = Dialog;
exports.default = mobx_react_1.observer(Dialog);
