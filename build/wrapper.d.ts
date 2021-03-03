import * as React from 'react';
import { Store } from './store';
export interface Props {
    store: Store;
}
export interface State {
    isOpen: boolean;
}
export declare class Wrapper extends React.Component<Props, State> {
    constructor(props: Props);
    render(): React.ReactNode;
    protected onDeclineClickHandler: () => void;
    protected onAcceptClickHandler: () => void;
}
