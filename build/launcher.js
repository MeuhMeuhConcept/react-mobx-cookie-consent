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
exports.Launcher = void 0;
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
class Launcher extends React.Component {
    render() {
        const { store } = this.props;
        if (store.noCookie !== false) {
            return null;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("button", { className: "cookie-consent-btn", onClick: () => store.toggleDialog() }, this.renderContent()));
    }
    renderContent() {
        return 'Manage cookie consent';
    }
}
exports.Launcher = Launcher;
exports.default = mobx_react_1.observer(Launcher);
