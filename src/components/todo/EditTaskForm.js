import React from 'react';
import {
    Button,
    Dialog,
    Paper,
    TextField,
} from 'material-ui';

import {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog';

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
                <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
                <Paper style={{ zIndex: 1300, backgroundColor: '#fff' }}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="desc"
                            label="Task description"
                            fullWidth
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