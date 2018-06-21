import React from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { red300 } from '@material-ui/core/colors';

import classes from './Auth.css';

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

class Auth extends React.Component {
    state = {
        fields: {
            name: {
                type: 'name',
                label: 'Name',
                helperText: 'We will call you so...',
                helperMsg: 'We will call you so...',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                touched: false
            },
            email: {
                type: 'email',
                label: 'Email',
                helperText: 'Enter your Email',
                helperMsg: 'Enter your Email',
                value: '',
                validation: {
                    required: true,
                    regexp: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                },
                touched: false
            },
            password: {
                type: 'password',
                label: 'Password',
                helperText: 'Enter your Password',
                helperMsg: 'Enter your Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                touched: false
            },
            password2: {
                type: 'password',
                label: 'Re-enter your Password',
                helperText: 'Confirm your Password',
                helperMsg: 'Confirm your Password',
                value: '',
                validation: {
                    shouldEquals: 'password',
                },
                touched: false,
            },
            address: {
                type: 'address',
                label: 'Address of your dreams',
                helperText: 'Enter here your dream address :)',
                helperMsg: 'Enter here your dream address :)',
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                style: { textAlign: 'left' },
                touched: false,
            }

        },
        canRegister: false,
        isRegister: true
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    isFieldValid(field) {
        if (field.error) return false;
        if (field.validation.required === true && !field.touched) return false;
        return true;
    }

    checkValidity(value, rules) {

        if (!rules) {
            return '';
        }

        if (rules.required && value.trim() === '') {
            return 'Please fill in this field';
        }

        if (rules.minLength && value.length < rules.minLength) {
            return 'Too short';
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return 'Too long';
        }

        if (rules.regexp && !rules.regexp.test(value)) {
            return 'Invalid format';
        }

        if (rules.shouldEquals && this.state.fields[rules.shouldEquals].value !== value){
            return 'Passwords do not match'
        }

        return ''
    }

    handleChange = name => event => {
        let errMsg = this.checkValidity(event.target.value, this.state.fields[name].validation)
        let hasError = errMsg !== '';

        // Prepare updated props
        let old = {...this.state.fields[name]};
        old.value= event.target.value;
        old.touched = true;
        if (hasError){
            old.error = true;
            old.helperText = errMsg;
        } else {
            old.error = false;
            old.helperText = old.helperMsg;        
        }

        let canRegister = !hasError;
        if (canRegister) {
            for (let key in this.state.fields) {
                if (key !== name && !this.isFieldValid(this.state.fields[key])) {
                    canRegister = false;
                    break;
                }
            }
        }

        const updatedControls = {
            ...this.state.fields,
            [name]: old, 
        };

        this.setState({ fields: updatedControls, canRegister: canRegister });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(
            this.state.fields.name.value,
            this.state.fields.email.value,
            this.state.fields.password.value,
            this.state.fields.address.value
        );
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.fields) {
            formElementsArray.push({
                id: key,
                config: this.state.fields[key]
            });
        }

        let fields = formElementsArray.map(e => (
            <TextField
                key={e.id}
                id={e.id}
                {...e.config}
                onChange={this.handleChange(e.id)}
            />
        ));
        let form = (<form >
            <Grid className={classes.Form}
                container
                alignItems="center"
                direction="column"
                justify="center">
                {fields}
                <Button
                    disabled={!this.state.canRegister}
                    label="Submit"
                    variant="raised"
                    color="secondary"
                    aria-label="submit"
                    style={{ margin: 15 }}
                    onClick={(event) => this.submitHandler(event)}>
                    SUBMIT
                </Button>
            </Grid>
        </form>);

        if (this.props.loading) {
            form = 'Loading...'
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <MuiThemeProvider theme={theme}>
                {authRedirect}
                <div className={classes.AnonBody}>
                    <Grid className={classes.FormBox}
                        container
                        alignItems="center"
                        direction="column"
                        justify="center" >
                        <Grid className={classes.AuthForm} >
                            <AppBar position="static" color="secondary" >
                                <Paper>
                                    <Typography
                                        className={classes.FormHeader}
                                        variant="title"
                                        color="inherit" >
                                        Please provide following info
                                </Typography>
                                </Paper>
                            </AppBar>
                            {errorMessage}
                            {form}

                        </Grid>
                        <Grid style={{ margin: 15, fontsize: '0.8em' }}>
                            <div className={classes.FormTip}> Already have an account? Please  <NavLink to="/" >Sign in</NavLink> </div>                        
                        </Grid>
                    </Grid>
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
        onRegister: (name, email, password, address) => dispatch(actions.fbRegister(name, email, password, address)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);