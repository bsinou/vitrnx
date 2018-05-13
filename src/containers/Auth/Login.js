import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import classes from './Auth.css';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red300, red400 } from 'material-ui/colors';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


const theme = createMuiTheme({
    palette: {
        background: {
            paper: red300
        },
        primary: red300,
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
        console.log('About to submit. State: ', this.state)
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
            <MuiThemeProvider theme={theme}>
                <Grid className={classes.AnonBody}
                    container
                    alignItems="center"
                    direction="column"
                    justify="center">
                    <Grid className={classes.AuthForm} >
                        <AppBar position="static" color="secondary" >
                            <Paper>
                                <Typography
                                    className={classes.FormHeader}
                                    height="60"
                                    variant="title"
                                    color="inherit" >
                                    Festival 4.0
                            </Typography>
                            </Paper>
                        </AppBar>
                        <div >
                            {errorMessage}
                            <TextField
                                id="email"
                                label="Email"
                                margin="normal"
                                onChange={this.handleChange('email')}
                                onKeyPress={this.handleKeyPress}
                            />
                            <br />
                            <TextField
                                id="password"
                                type="password"
                                helperText="Enter your Password"
                                label="Password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                                onKeyPress={this.handleKeyPress}
                            />
                            <br />
                            <Button

                                variant="raised"
                                label="Submit"
                                style={{ margin: 15 }}
                                onClick={(event) => this.submitHandler(event)} >
                                SUBMIT
                                </Button>
                        </div>
                    </Grid>
                    <Grid style={{ margin: 15, color: red400, fontsize: '0.8em' }}>
                        No account yet? Please  <NavLink to="/register" >Register</NavLink>
                    </Grid>


                </Grid>
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
