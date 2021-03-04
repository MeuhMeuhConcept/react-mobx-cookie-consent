import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

export interface Props {
    store: Store
    enableCustomization?: boolean
}

export interface State {

}

export class Dialog extends React.Component<Props, State> {

    render (): React.ReactNode {
        const { store } = this.props

        return <>
            <Modal isOpen={store.dialogIsOpened} centered>
                <ModalBody className="cookie-consent-dialog-body">
                    { this.renderModalBody() }
                </ModalBody>
                <ModalFooter className="cookie-consent-dialog-footer">
                    <button onClick={this.onAcceptClickHandler} className="cookie-consent-dialog-btn-accept">
                        { this.renderButtonAcceptAll() }
                    </button>
                    <button onClick={this.onDeclineClickHandler} className="cookie-consent-dialog-btn-decline">
                        { this.renderButtonDeclineAll() }
                    </button>
                    { this.props.enableCustomization && (
                        <button onClick={this.onCustomizeClickHandler}  className="cookie-consent-dialog-btn-customize">
                            { this.renderButtonCustomize() }
                        </button>
                    )}
                </ModalFooter>
            </Modal>
        </>
    }

    renderModalBody (): React.ReactNode {
        return 'Cookie Consent ?'
    }

    renderButtonAcceptAll (): React.ReactNode {
        return 'Accept all'
    }

    renderButtonDeclineAll (): React.ReactNode {
        return 'Decline all'
    }

    renderButtonCustomize (): React.ReactNode {
        return 'Customize'
    }

    protected onDeclineClickHandler = (): void => {
        const { store } = this.props

        store.declineAll()
    }

    protected onAcceptClickHandler = (): void => {
        const { store } = this.props

        store.acceptAll()
    }

    protected onCustomizeClickHandler = (): void => {
        console.log('comming soon...')
    }
}

export default observer(Dialog)