"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
const React = require("react");
const reactstrap_1 = require("reactstrap");
class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.onDeclineClickHandler = () => {
            const { store } = this.props;
            store.declineAll();
            this.setState({
                isOpen: false
            });
        };
        this.onAcceptClickHandler = () => {
            const { store } = this.props;
            store.acceptAll();
            this.setState({
                isOpen: false
            });
        };
        this.state = {
            isOpen: this.props.store.noCookie === false
        };
    }
    render() {
        const { store } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Modal, { isOpen: this.state.isOpen, centered: true },
                React.createElement(reactstrap_1.ModalBody, null, "Cookie Consent"),
                React.createElement(reactstrap_1.ModalFooter, null,
                    React.createElement(reactstrap_1.Button, { color: "primary", onClick: this.onDeclineClickHandler }),
                    React.createElement(reactstrap_1.Button, { color: "secondary", onClick: this.onAcceptClickHandler }))),
            store.noCookie === false && (React.createElement(reactstrap_1.Button, { className: "cookie-consent-btn", onClick: () => this.setState({ isOpen: true }) }, "Manage cookie consent")));
    }
}
exports.Wrapper = Wrapper;
