import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import classes from './Auth.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red200, red300, red400 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


// This replaces some of the default material UI styles.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
    appBar: {
        height: 65,
        color: red300
    },
    raisedButton: {
        primaryColor: red300
    },
    textField: {
        floatingLabelColor: red200,
        focusColor: red300,
    }
});



class Login extends Component {
    state = {
        email: '',
        password: '',
        isSignup: false
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.submitHandler(event)
        }
      }

    render() {

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p style={{ textAlign: 'left', margin: 15, color: red400, fontsize: '0.8em' }}>Something went wrong...</p>);
            if ('INVALID_EMAIL' === this.props.error.message) {
                errorMessage = (
                    <div style={{ textAlign: 'left', margin: 6, color: red400, fontsize: '0.8em' }}>
                        <p>Could not login.</p>
                        <p>Are you sure your caps lock is not engaged?</p>
                    </div>
                );
            }
        }


        return (
            <div className={classes.FullAnonBody}>
                <div className={classes.OuterBox}>
                    <div className={classes.LeftCol}> </div>
                    <MuiThemeProvider muiTheme={muiTheme}>

                        <div className={classes.RightCol}>
                            <div className={classes.AuthForm}>
                                <AppBar
                                    showMenuIconButton={false}
                                    title="Festival 4.0"
                                />
                                <div className={classes.InnerBox}>
                                    {errorMessage}
                                    <TextField
                                        floatingLabelText="Email"
                                        onChange={(event, newValue) => this.setState({ email: newValue })}
                                        onKeyPress={this.handleKeyPress}
                                    />
                                    <br />
                                    <TextField
                                        type="password"
                                        hintText="Enter your Password"
                                        floatingLabelText="Password"
                                        onChange={(event, newValue) => this.setState({ password: newValue })}
                                        onKeyPress={this.handleKeyPress}
                                    />
                                    <br />
                                    <RaisedButton label="Submit" primary={true} style={{ margin: 15 }} onClick={(event) => this.submitHandler(event)} />
                                </div>
                            </div>
                            <div style={{ margin: 15, color: red400, fontsize: '0.8em' }}>
                                No account yet? Please  <NavLink to="/register" >Register</NavLink>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.fbAuth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);