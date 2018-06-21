import React from 'react';

import Autosuggest from '../ui/Select/SimpleSelect'

import { FLAG_URGENT, FLAG_IMPORTANT } from "../../assets/conf/tasks";

import {
    withStyles,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Icon,
    Input,
    Paper,
    Tooltip,
} from '@material-ui/core';

import tasksStyle from "../../assets/jss/tasksStyle.jsx";

const utils = require('../../utils/helpers');
class FormDialog extends React.Component {
    state = {
        open: false,
        touched: false,
        urgent: false,
        manager: null,
    };

    componentDidMount() {
        this.setState({ task: this.props.task, open: true, manager: { id: this.props.task.managerId, label: this.props.task.manager } });
    }

    handleClose = (submit) => {
        this.props.onClose(submit && this.state.touched, this.state.task)
    };

    handleKeyPress = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            this.handleClose()
        }
    }

    handleChange = name => event => {
        this.setState({
            task: { ...this.state.task, [name]: event.target.value },
            touched: true,
        });
    }

    handleManagerSelected = event => {
        this.setState({
            task: { ...this.state.task, managerId: event.id, manager: event.label },
            touched: true,
            manager: event,
        });
    }

    handleToggleFlag = event => {
        var newFlags = this.state.task.flags ^ event;
        
        this.setState({
            task: { ...this.state.task, flags: newFlags },
            touched: true,
        });
    }

    render() {
        const { classes, knownGroups } = this.props;
        const { task, manager } = this.state;
        const suggestions = [];
        for (var id in knownGroups) {
            suggestions.push(knownGroups[id])
        }
        return !task ? null : (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Paper style={{ backgroundColor: '#fff', opacity: '0.95' }}>

                    <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
                    <DialogContent>
                        <FormGroup row>
                            <Autosuggest
                                defaultSelectedItem={manager}
                                onSelect={this.handleManagerSelected}
                                suggestions={suggestions}
                                label="Assigned to"
                                helperText="Choose a manager"
                            />
                            <Tooltip
                                id="tooltip-top"
                                title="Mark task as urgent"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                            >
                                <FormControlLabel
                                    style={{ backgroundColor: "transparent" }}
                                    control={
                                        <Checkbox
                                            checked={task.flags & FLAG_URGENT}
                                            style={{ marginLeft: "2em" }}
                                            icon={<Icon>offline_bolt</Icon>}
                                            checkedIcon={<Icon  style={{ color: utils.getImportanceColor(FLAG_URGENT)}}>offline_bolt</Icon>}
                                            value="urgent"
                                            onChange={() => this.handleToggleFlag(FLAG_URGENT)}
                                        />
                                    }
                                />

                            </Tooltip>
                            <Tooltip
                                id="tooltip-top"
                                title="Mark task as important"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                            >
                                <FormControlLabel
                                    style={{ backgroundColor: "transparent" }}
                                    control={
                                        <Checkbox
                                            checked={task.flags & FLAG_IMPORTANT}
                                            icon={<Icon>new_releases</Icon>}
                                            checkedIcon={<Icon style={{ color: utils.getImportanceColor(FLAG_IMPORTANT)}}>new_releases</Icon>}
                                            value="important"
                                            onChange={() => this.handleToggleFlag(FLAG_IMPORTANT)}
                                        />
                                    }
                                />
                            </Tooltip>
                        </FormGroup>
                        <Input
                            id="desc"
                            style={{ padding: '0.3em', border: '1px solid #40268c', marginTop: '20px', minWidth: '320px', minHeight: '320px' }}
                            autoFocus
                            multiline
                            fullWidth
                            rows="4"

                            margin="dense"
                            label="Task description"

                            value={this.state.task ? this.state.task.desc : ''}
                            onChange={this.handleChange('desc')}
                            onKeyPress={this.handleKeyPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(false)} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => this.handleClose(true)} color="primary">
                            Do Update
                    </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        );
    }
}

export default withStyles(tasksStyle)(FormDialog);