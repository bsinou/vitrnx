import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper'
import {
    withStyles,
    AppBar,
    Button,
    Checkbox,
    Dialog, DialogActions, DialogContent, DialogContentText,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid,
    Icon,
    Input, InputLabel,
    Paper,
    Radio, RadioGroup,
    Slide,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    grid: {
        padding: "10px 15px !important"
    },
    fieldset: {
        padding: "10px 15px !important"
    },
    textField: {
        width: "36px"
    }
};

const gridStyle = {
    grid: {
        padding: "10px 15px !important",
        margin: '10px',
        backgroundColor: '#fafafa',
    }
};

function CustGridItem({ ...props }) {
    const { classes, children, ...rest } = props;
    return (
        <Grid item {...rest} className={classes.grid}>
            {children}
        </Grid>
    );
}

const GridItem = withStyles(gridStyle)(CustGridItem);


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        touched: false,
        open: false,
        presence: {
            d4: false,
            d5: false,
            d6: false,
            d7: false,
            transport: 'Unknown',
            comments: '',
            adultNb: 0,
            childNb: 0,
        }
    };

    // componentDidMount() {
    //     console.log("Did mount", this.props.open, this.props.presence);
    // }


    componentDidUpdate() {
        if (this.state.open !== this.props.open) {
            console.log("Did update on " + (this.props.open ? "open" : "close") + ", about to set state with presence.", this.props.presence);
            this.setState({ open: this.props.open, presence: { ...this.props.presence } });
        }
    }

    handleClose = (commit) => {
        var updated = { ...this.state.presence }
        if (this.state.touched) {
            updated.isComing = updated.d4 || updated.d5 || updated.d6 || updated.d7
        }
        this.props.onClose(commit && this.state.touched, updated)
        this.setState({ open: false });
    };

    handleChange = name => event => {
        // console.log("Change received", name, event.target.value)
        this.setState({ touched: true, presence: { ...this.state.presence, [name]: event.target.value, } });
    }

    handleTransportChange = event => {
        // console.log("Radio received",  event.target.value)
        this.setState({ touched: true, presence: { ...this.state.presence, transport: event.target.value, } });
    }

    handleBoolean = name => event => {
        // console.log("Check received", name, event.target.value)
        this.setState({ touched: true, presence: { ...this.state.presence, [name]: !this.state.presence[name], touched: true, } });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                It would be of great help if you could tell us a little bit more about your plans...
                            </Typography>
                            <Icon aria-label="close" className={classes.icon} onClick={this.handleClose}>close</Icon>
                        </Toolbar>
                    </AppBar>
                    <Paper style={{ backgroundColor: '#fff', opacity: '1' }}>
                        <DialogContent>

                            {!this.props.isRegistered ? (
                                <DialogContentText>
                                    <p>
                                        You are currently visiting this website anonymously as guest@sinou.org.
                                    </p>
                                    <p>
                                        In order for us to be able to store your information, {' '}
                                        <NavLink to="/logout-register" className="TextLink">
                                            please register first
                                        </NavLink>.
                                    </p>
                                </DialogContentText>

                            ) : (
                                    <AuxWrapper>

                                        <DialogContentText>
                                            Everything OK: you will have no fine if you finally change your plans...
                                            But if you can give us some kind of good approximation, it will grealy help us, thanks.
                                        </DialogContentText>
                                        <Grid container >
                                            <GridItem xs={12} sm={12} md={12}>
                                                {/* <Paper style={{ backgroundColor: '#cedede', opacity: '1' }}> */}
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">On which day will you be there?</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.presence.d4}
                                                                    onChange={this.handleBoolean('d4')}
                                                                />
                                                            }
                                                            label="Thursday"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.presence.d5}
                                                                    onChange={this.handleBoolean('d5')}
                                                                />
                                                            }
                                                            label="Friday"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.presence.d6}
                                                                    onChange={this.handleBoolean('d6')}
                                                                />
                                                            }
                                                            label="Saturday"
                                                        />

                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.presence.d7}
                                                                    onChange={this.handleBoolean('d7')}
                                                                />
                                                            }
                                                            label="Sunday"
                                                        />
                                                    </FormGroup>
                                                    <FormHelperText>
                                                        The climax of the party will be on Friday and Saturday,
                                                        but you certainly can stay until Sunday so that you can drive safely.
                                                        You might arrive on thursday night for the Vorspiel.
                                                    </FormHelperText>
                                                </FormControl>
                                                {/* </Paper> */}
                                            </GridItem>
                                        </Grid>
                                        <Grid container >
                                            {/* <Paper style={{ backgroundColor: '#cedede', opacity: '1' }}> */}
                                            <GridItem xs={12} sm={12} md={6}>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend">Are you coming with your own car?</FormLabel>
                                                    <RadioGroup
                                                        aria-label="transport"
                                                        name="transport"
                                                        className={classes.group}
                                                        value={this.state.presence.transport}
                                                        onChange={this.handleTransportChange}
                                                    >
                                                        <FormControlLabel value="OwnCar" control={<Radio />} label="Yep, I come with my car" />
                                                        <FormControlLabel value="IsBrought" control={<Radio />} label="Nope, but I know someone that will bring me" />
                                                        <FormControlLabel value="NeedHelp" control={<Radio />} label="Good question, maybe I'll need a ride from the train station..." />
                                                        <FormControlLabel value="Unknown" control={<Radio />} label="No idea!" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </GridItem>
                                            {/* </Paper>
                            <Paper style={{ backgroundColor: '#cedede', opacity: '1' }}> */}
                                            <GridItem xs={12} sm={12} md={6}>
                                                <FormLabel component="legend"><b>Including you</b>, how big is your crew? (For instance, if you come with your grand mother, correct answer is 2 :)</FormLabel>
                                                <Grid container >
                                                    <GridItem xs={6} sm={6} md={3}>
                                                        <TextField
                                                            id="adultNb"
                                                            // label="Adults"
                                                            helperText="Adults"
                                                            value={this.state.presence.adultNb}
                                                            onChange={this.handleChange('adultNb')}
                                                            type="number"
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            margin="normal"
                                                        />

                                                    </GridItem>
                                                    <GridItem xs={6} sm={6} md={3}>
                                                        <TextField
                                                            id="adultNb"
                                                            //label="Children"
                                                            helperText="Children"
                                                            value={this.state.presence.childNb}
                                                            onChange={this.handleChange('childNb')}
                                                            type="number"
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            margin="normal"
                                                        />
                                                    </GridItem>
                                                </Grid>
                                            </GridItem>
                                            {/* </Paper> */}
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: "#888888", margin: '1em 0em 0em 0em' }}>
                                                    Anything you want to add?
                                                </InputLabel>
                                                <Input
                                                    style={{ width: '100%', height: '60px' }}
                                                    multiline
                                                    // fullwidth
                                                    value={this.state.presence.comments}
                                                    onChange={this.handleChange('comments')}
                                                    // margin="normal"
                                                    border="block"
                                                />
                                            </GridItem>
                                        </Grid>

                                    </AuxWrapper>
                                )}
                            <DialogActions>
                                <Button onClick={() => this.handleClose(false)} color="primary">Cancel</Button>
                                <Button onClick={() => this.handleClose(true)} color="primary">Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </Paper>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);

