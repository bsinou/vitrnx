import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Spinner from '../../components/ui/Spinner/Spinner';
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


class Auth extends Component {
    state = {
        fields: {
            name: {
                type: 'name',
                hintText: 'We will call you so...',
                floatingLabelText: 'Name',
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
                hintText: 'Enter your Email',
                floatingLabelText: 'Email',
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
                hintText: 'Enter your Password',
                floatingLabelText: 'Password',
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
                hintText: 'Enter here your dream address :)',
                floatingLabelText: 'Address of your dreams',
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

    inputChangedHandler = (event, controlName) => {
        let errMsg = this.checkValidity(event.target.value, this.state.fields[controlName].validation)
        let canRegister = errMsg === '';
        if (canRegister) {
            for (let key in this.state.fields) {
                if (key !== controlName && !this.isFieldValid(this.state.fields[key])) {
                    canRegister = false;
                    break;
                }
            }
        }

        const updatedControls = {
            ...this.state.fields,
            [controlName]: {
                ...this.state.fields[controlName],
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
                {...e.config}
                onChange={(event, newValue) => this.inputChangedHandler(event, e.id)}
            />
        ));
        let form = <form > {fields} </form>;

        if (this.props.loading) {
            form = <Spinner />
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
            <div className={classes.FullAnonBody}>
                <div className={classes.OuterBox}>
                    <div className={classes.LeftCol}> </div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <div className={classes.RightCol}>

                            <div className={classes.RegisterForm}>
                                <AppBar
                                    showMenuIconButton={false}
                                    title="Please provide following information"
                                />
                                <div className={classes.InnerBox}>
                                    {errorMessage}
                                    {authRedirect}

                                    {form}

                                    <br />
                                    <RaisedButton
                                        label="Register"
                                        primary={true}
                                        disabled={!this.state.canRegister}
                                        style={{ margin: 15 }}
                                        onClick={(event) => this.submitHandler(event)}
                                    />
                                </div>
                            </div>
                            <div style={{ margin: 15, color: red400, fontsize: '0.8em' }}>
                                Already have an account? Please  <NavLink to="/" >Sign in</NavLink>
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
        onRegister: (name, email, password, address) => dispatch(actions.register(name, email, password, address)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);