import React from 'react';

import {
  withStyles,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip
} from 'material-ui';
import { Edit, Close, Check } from "@material-ui/icons";

import PropTypes from "prop-types";

import tasksStyle from "../../assets/jss/tasksStyle.jsx";

class Tasks extends React.Component {

  render() {
    const { classes, tasks, closeTask, editTask, removeTask } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {!tasks ? null : tasks.map(task => (
            <TableRow key={task.id} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Checkbox
                  checked={task.closeDate && task.closeDate > 1}
                  tabIndex={-1}
                  onClick={() => closeTask(task)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked
                  }}
                />
              </TableCell>
              <TableCell style={{ width: '480px' }} className={classes.tableCell} dense="true">
                {task.desc}
              </TableCell>
              <TableCell className={classes.tableActions} >
                <Tooltip
                  id="tooltip-top"
                  title="Edit Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => editTask(task.id)}
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
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(Tasks);
