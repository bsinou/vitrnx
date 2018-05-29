import React from 'react';

import Aux from '../../hoc/AuxWrapper/AuxWrapper';

import { withStyles } from 'material-ui/styles';
import { Button, Icon, Tooltip } from 'material-ui';

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
                    <Tooltip id="tooltip-save" title="Save">
                        <Button className={classes.button} color="primary" onClick={onSave}>
                            <Icon className={classes.icon}>save</Icon>
                        </Button>
                    </Tooltip>
                    <Tooltip id="tooltip-saveAndBack" title="Save and stop editing">
                        <Button className={classes.button} color="secondary" onClick={onSaveAndQuit}>
                            <Icon className={classes.icon}>save</Icon>
                        </Button>
                    </Tooltip>
                    <Tooltip id="tooltip-cancel" title="Cancel edition">
                        <Button className={classes.button} color="secondary" onClick={onCancel}>
                            <Icon className={classes.icon}>cancel</Icon>
                        </Button>
                    </Tooltip>
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