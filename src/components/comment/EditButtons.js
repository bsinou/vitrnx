import React from 'react';

import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

// Styling
import customClasses from './Comment.css';

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
    const { classes, onEdit, onDelete } = props;
    return (
      <div className={customClasses.AllBtnBox}>
        <Icon style={{fontSize: '20px'}} aria-label="Edit" className={[classes.button, customClasses.SingleBtnBox].join(' ')} onClick={onEdit}>edit_circle</Icon>
        <Icon style={{fontSize: '20px'}} aria-label="Delete" className={[classes.button, customClasses.SingleBtnBox].join(' ')} onClick={onDelete}>delete_circle</Icon>
      </div>
    );
  }

    export default withStyles(styles)(editButtons)