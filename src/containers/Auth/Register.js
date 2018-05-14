import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import classes from './Auth.css';


import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { red300, red400 } from 'material-ui/colors';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';


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
                helperText: 'We will call you so...',
                label: 'Name',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                errorText: '',
                touched: false
            },
            email: {
                type: 'email',
                helperText: 'Enter your Email',
                label: 'Email',
                value: '',
                validation: {
                    required: true,
                    regexp: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                },
                errorText: '',
                touched: false
            },
            password: {
                type: 'password',
                helperText: 'Enter your Password',
                label: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                errorText: '',
                touched: false
            },
            address: {
                type: 'address',
                helperText: 'Enter here your dream address :)',
                label: 'Address of your dreams',
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                style: { textAlign: 'left' },
                errorText: '',
                touched: false,
                multiLine: true,
                rows: 1,
                rowsMax: 8
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
        if (field.errorText !== '') return false;
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

        if (rules.maxLength && value.length > rules.minLength) {
            return 'Too long';
        }

        if (rules.regexp && !rules.regexp.test(value)) {
            return 'Invalid format';
        }

        return ''
    }

    handleChange = name => event => {
        let errMsg = this.checkValidity(event.target.value, this.state.fields[name].validation)
        let canRegister = errMsg === '';
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
            [name]: {
                ...this.state.fields[name],
                value: event.target.value,
                errorText: errMsg,
                touched: true
            }
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
                justify="center"
            >
                {fields}
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
                                    Please provide following information
                            </Typography>
                            </Paper>
                        </AppBar>
                        {errorMessage}
                        {authRedirect}
                        {form}
                        <br />
                        <Button
                            variant="raised"
                            label="Submit"
                            style={{ margin: 15 }}
                            onClick={(event) => this.submitHandler(event)}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                    <Grid style={{ margin: 15, color: red400, fontsize: '0.8em' }}>
                        Already have an account? Please  <NavLink to="/" >Sign in</NavLink>
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
        onRegister: (name, email, password, address) => dispatch(actions.fbRegister(name, email, password, address)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);