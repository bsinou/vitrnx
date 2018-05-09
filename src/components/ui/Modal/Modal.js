import React, { Component } from 'react';

import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper'
import Backdrop from '../Backdrop/Backdrop'


import classes from './Modal.css'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }
    
    render() {
        return (
            <AuxWrapper>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh )',
                        opacity: this.props.show ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div>
            </AuxWrapper>

        );
    }
}


export default Modal;