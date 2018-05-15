import React from 'react';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

// Styling
import customClasses from './EditButtons.css';

const styles = theme => ({
    button: {
        margin: '0em',
        size: '12px',
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
    const { classes, onSave, onCancel, onDelete, canDelete } = props;
    return (
        <div className={[customClasses.AllBtnBox, customClasses.SideButtons].join(' ')}>
            <Button color="primary" onClick={onSave}>
                <Icon>save</Icon>
            </Button>
            <Button color="primary" onClick={onCancel}>
                <Icon>cancel</Icon>
            </Button>
            {canDelete ? (
                <li key="delete" >
                    <Button color="secondary" onClick={onDelete} >
                        <Icon>delete_circle</Icon>
                    </Button>
                </li>
            ) : null}
        </div>
    );
}


export default withStyles(styles)(editButtons)