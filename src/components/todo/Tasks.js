import React from 'react';

import Aux from '../../hoc/AuxWrapper/AuxWrapper';
import EditTaskForm from './EditTaskForm';

import {
  withStyles,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip
} from '@material-ui/core';

import { Edit, Close, Check } from "@material-ui/icons";

import PropTypes from "prop-types";

import tasksStyle from "../../assets/jss/tasksStyle.jsx";

class TaskRow extends React.Component {

  render() {
    const { classes, task, closeTask, editTask, removeTask } = this.props;
    var checked = task.closeDate && task.closeDate > 1;
    var checkedStyle = [classes.tableActionButtonIcon, checked ? classes.checkedIcon : classes.uncheckedIcon].join(' ')

    return (<TableRow key={task.id} className={classes.tableRow}>
      <TableCell className={classes.tableCell}>
        <Tooltip
          id="tooltip-top"
          title={"Assigned to " + task.manager}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Avatar className={classes.orangeAvatar}>{task.manager.charAt(0)}</Avatar>
        </Tooltip>
      </TableCell>
      <TableCell style={{ maxWidth: '480px' }} className={classes.tableCell} dense="true">
        {task.desc}
      </TableCell>
      <TableCell className={classes.tableActions} >
        <Tooltip
          id="tooltip-top"
          title="Mark task as done"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Complete"
            className={classes.tableActionButton}
            onClick={() => closeTask(task)}
          >
            <Check className={checkedStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="tooltip-top"
          title="Edit Task"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick={() => editTask(task)}
          >
            <Edit
              className={
                classes.tableActionButtonIcon + " " + classes.edit
              }
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="tooltip-top-start"
          title="Remove"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Remove"
            className={classes.tableActionButton}
            onClick={() => removeTask(task.id)}
          >
            <Close className={classes.tableActionButtonIcon + " " + classes.close} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
    );
  }
}

const StyledTaskRow = withStyles(tasksStyle)(TaskRow);

class Tasks extends React.Component {

  state = {
    openEdit: false,
    editedTask: {}
  }

  onClose = (hasChanged, task) => {
    this.props.editTask(task);
    this.setState({
      openEdit: false,
      editedTask: {}
    });
  };

  onEdit = (task) => {
    this.setState({
      openEdit: true,
      editedTask: task,
    })
  }

  render() {
    const { classes, tasks, closeTask, removeTask } = this.props;

    return (
      <Aux>
        {!this.state.openEdit ? null : (
          <EditTaskForm
            open={this.state.openEdit}
            onClose={this.onClose}
            task={this.state.editedTask}
            aria-labelledby="form-dialog-title"
          />
        )}
        <Table className={classes.table}>
          <TableBody>
            {!tasks ? null : tasks.map(task => (
              <StyledTaskRow task={task} closeTask={closeTask} editTask={this.onEdit} removeTask={removeTask}
              />
            ))}
          </TableBody>
        </Table>
      </Aux>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(Tasks);
