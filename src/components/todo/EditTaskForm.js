import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Input,
} from '@material-ui/core';


export default class FormDialog extends React.Component {
    state = {
        open: false,
        touched: false,
    };

    componentDidMount() {
        this.setState({ task: this.props.task, open: true });
    }

    handleClose = (submit) => {
        this.props.onClose(submit && this.state.touched, this.state.task)
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            this.handleClose()
        }
    }

    handleChange = name => event => {
        this.setState({
            task: { ...this.state.task, [name]: event.target.value, touched: true }
        });
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Paper style={{ backgroundColor: '#fff', opacity:'0.95' }}>

                <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
                    <DialogContent>
                        <Input
                            id="desc"
                            style={{minWidth:'320px'}}
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