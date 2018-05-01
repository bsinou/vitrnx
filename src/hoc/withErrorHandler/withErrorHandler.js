import React, { Component } from 'react';

import Aux from '../Aux/Aux'
// import Modal from '../../components/ui/Modal/Modal'

import Snackbar from 'material-ui/Snackbar';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = { // enable display and disposal of the popup.
            message: null,
            isError: false,
            showSnack: false
        }

        /* We rather use component*WILL*Mount:
            -> the below calls have no side effect (we just register)
            -> the error interceptor is registered even if the very first rendering fails,
                e.g. that will means that the componentDidMount method of this level is never called
        */
        componentWillMount() {
            // this.reqInterceptor = ... : This syntax enables addition of a global variable lazily.
            this.reqInterceptor = axios.interceptors.request.use(
                requestConfig => {
                    // this.setState({ error: null });
                    return requestConfig;
                }, error => {
                    return Promise.reject(error);
                }
            );

            this.resInterceptor = axios.interceptors.response.use(
                response => {
                    // Here we can edit response config
                    // console.log("######## the response: ", response)
                    this.setState({
                        message: 'OK',
                        isError: false,
                        showSnack: true,
                    });
                    return response;
                }, error => {
                    // console.log("######## the response: ", error)
                    this.setState({
                        message: 'Got An error',
                        isError: true,
                        showSnack: true,
                    });
                    return Promise.reject(error);
                }
            );
        }

        // Don't forget to dispose (eject) the interceptors to avoid memory leaks
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        disposeModal = () => {
            this.setState({ error: null });
        }

        handleRequestClose = () => {
            this.setState({
                message: null,
                isError: false,
                showSnack: false,
            });
        };

        render() {
            return (
                <Aux>
                    {/* <Modal
                        show={this.state.error}
                        modalClosed={this.disposeModal}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal> */}
                    <WrappedComponent {...this.props} />
                    <Snackbar
                        open={this.state.showSnack}
                        message={this.state.message}
                        autoHideDuration={8000}
                        onRequestClose={this.handleRequestClose}
                    />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
