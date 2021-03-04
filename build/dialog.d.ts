import * as React from 'react';
import { Store } from './store';
export interface Props {
    store: Store;
    enableCustomization?: boolean;
}
export interface State {
}
export declare class Dialog extends React.Component<Props, State> {
    render(): React.ReactNode;
    renderModalBody(): React.ReactNode;
    renderButtonAcceptAll(): React.ReactNode;
    renderButtonDeclineAll(): React.ReactNode;
    renderButtonCustomize(): React.ReactNode;
    protected onDeclineClickHandler: () => void;
    protected onAcceptClickHandler: () => void;
    protected onCustomizeClickHandler: () => void;
}
declare const _default: typeof Dialog;
export default _default;
