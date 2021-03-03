import * as React from 'react'
import { Store } from './store'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

export interface Props {
    store: Store
}

export interface State {
    isOpen: boolean
}

export class Wrapper extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props)

        this.state = {
            isOpen: this.props.store.noCookie === false
        }
    }

    render (): React.ReactNode {
        const { store } = this.props

        return <>
            <Modal isOpen={this.state.isOpen} centered>
                <ModalBody>
                    Cookie Consent
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onDeclineClickHandler}></Button>
                    <Button color="secondary" onClick={this.onAcceptClickHandler}></Button>
                </ModalFooter>
            </Modal>
            { store.noCookie === false && (
                <Button
                    className="cookie-consent-btn"
                    onClick={() => this.setState({ isOpen: true })}
                    >
                    Manage cookie consent
                </Button>
            )}
        </>
    }

    protected onDeclineClickHandler = (): void => {
        const { store } = this.props

        store.declineAll()

        this.setState({
            isOpen: false
        })
    }

    protected onAcceptClickHandler = (): void => {
        const { store } = this.props

        store.acceptAll()

        this.setState({
            isOpen: false
        })
    }
}
