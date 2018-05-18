import React from 'react';

import Aux from '../../hoc/AuxWrapper/AuxWrapper';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

import customCss from './Dashboard.css';

const styles = theme => ({
    button: {
        margin: '0em',
        size: '12px',
        width: '18px',
    },
    icon: {
        size: '12px',
    },
    input: {
        display: 'none',
    },
    spacing: {
        iconSize: 8,
    },
});

function editButtons(props) {
    const { classes, isEditing, onSave, onSaveAndQuit, onCancel, onEdit } = props;
    return (
        <div className={customCss.EditButtons}>
            {isEditing ? (
                <Aux>
                    <Button className={classes.button} color="primary" onClick={onSave}>
                        <Icon className={classes.icon}>save</Icon>
                    </Button>
                    <Button className={classes.button} color="secondary" onClick={onSaveAndQuit}>
                        <Icon className={classes.icon}>save</Icon>
                    </Button>
                    <Button className={classes.button} color="secondary" onClick={onCancel}>
                        <Icon className={classes.icon}>cancel</Icon>
                    </Button>
                </Aux>
            ) : (
                    <Button color="primary" onClick={onEdit}>
                        <Icon>edit</Icon>
                    </Button>
                )
            }
        </div>
    );
}

export default withStyles(styles)(editButtons)