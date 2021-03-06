import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import classes from './Auth.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { red300, red400 , blue400 } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        background: {
            paper:  blue400
        },
        primary:  blue400,
        secondary: blue400,
    },

    paper: {
        zDepth: 0,
    },
});


class Login extends React.Component {
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
        if (event.key === 'Enter') {
            this.submitHandler(event)
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
            // justify="center"

            <MuiThemeProvider theme={theme}>
                <div className={classes.Container}>
                    <div className={classes.AnonBody}>
                        <Grid className={classes.FormBox}
                            container
                            alignItems="center"
                            direction="column">
                            <Grid className={classes.AuthForm} >
                                <AppBar position="static" color="secondary" >
                                    <Paper>
                                        <Typography
                                            className={classes.FormHeader}
                                            height="60"
                                            variant="title"
                                            color="inherit" >
                                            Please log in
                                        </Typography>
                                    </Paper>
                                </AppBar>
                                <Grid className={classes.Form}
                                    container
                                    alignItems="center"
                                    direction="column"
                                    justify="center">
                                    {errorMessage}
                                    <TextField
                                        id="email"
                                        label="Email"
                                        margin="normal"
                                        onChange={this.handleChange('email')}
                                        onKeyPress={this.handleKeyPress}
                                    />
                                    <TextField
                                        id="password"
                                        type="password"
                                        helperText="Enter your Password"
                                        label="Password"
                                        margin="normal"
                                        onChange={this.handleChange('password')}
                                        onKeyPress={this.handleKeyPress}
                                    />

                                    <Button
                                        label="Submit"
                                        variant="raised"
                                        color="secondary"
                                        aria-label="submit"
                                        style={{ margin: 15 }}
                                        onClick={(event) => this.submitHandler(event)} >
                                        SUBMIT
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid >
                                <div className={classes.FormTip} style={{ margin: 15, fontsize: '0.8em' }}>
                                    No account yet? Please  <NavLink to="/register" >Register</NavLink>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
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
