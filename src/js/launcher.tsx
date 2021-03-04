import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'

export interface Props {
    store: Store
}

export interface State {

}

export class Launcher extends React.Component<Props, State> {

    render (): React.ReactNode {
        const { store } = this.props

        if (store.noCookie !== false) {
            return null
        }

        return <>
            <button
                className="cookie-consent-btn"
                onClick={() => store.toggleDialog()}
                >
                { this.renderContent() }
            </button>
        </>
    }

    renderContent (): React.ReactNode {
        return 'Manage cookie consent'
    }
}

export default observer(Launcher)
