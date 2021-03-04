import * as React from 'react';
import { Store } from './store';
export interface Props {
    store: Store;
}
export interface State {
}
export declare class Launcher extends React.Component<Props, State> {
    render(): React.ReactNode;
    renderContent(): React.ReactNode;
}
