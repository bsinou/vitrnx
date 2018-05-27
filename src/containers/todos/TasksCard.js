import React from 'react';
import { connect } from 'react-redux';
import axios from '../../apiServer';
import moment from 'moment';

import Tasks from '../../components/todo/Tasks';

import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  TextField
} from 'material-ui';

// Dashboard, 
import { VerifiedUser, QueueMusic, Build, LocalBar, People, Terrain, ChildCare, AccountBalance, Computer  } from "@material-ui/icons";

import tasksCardStyle from "../../assets/jss/tasksCardStyle";


class CardLayout extends React.Component {

  state = {
    newTaskDesc: '',
  }

  handleDescChange = (event) => {
    this.setState({ newTaskDesc: event.target.value })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.props.onCreateNew(this.props.selectedTabId, this.state.newTaskDesc);
      // TODO rather use a promise to only reset the field when creation has been effectively done
      this.setState({ newTaskDesc: '' })
    }
  }

  render() {
    const { classes, selectedTabIndex, onSelect, tasks, closeTask, editTask, removeTask } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader 
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title="TODO"
          action={
            <Tabs
              classes={{
              flexContainer: classes.tabsContainer,
              //   indicator: classes.displayNone
              }}
              value={selectedTabIndex}
              onChange={onSelect}
              textColor="inherit"
              scrollable
              scrollButtons="on"
            >
              <Tab
                style={{width: '32px'}}
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                labelStyle={{fontSiize: 15}}
                icon={<VerifiedUser className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}

                icon={<QueueMusic className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<Build className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<LocalBar className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<ChildCare className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<People className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<Terrain className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<AccountBalance className={classes.tabIcon} />}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                }}
                icon={<Computer className={classes.tabIcon} />}
              />
            </Tabs>
          }
        />
        <CardContent>
          <TextField
            fullWidth
            label="Create a task..."
            rows={2}
            rowsMax={4}
            value={this.state.newTaskDesc}
            onChange={this.handleDescChange}
            onKeyPress={this.handleKeyPress}
          />
          <Typography component="div">
            {!tasks ? null : (
              <Tasks tasks={tasks} closeTask={closeTask} editTask={editTask} removeTask={removeTask} />
            )}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const StyledCard = withStyles(tasksCardStyle)(CardLayout);

class TasksCard extends React.Component {

  state = {
    loaded: false,
    loadedIndex: -1,
    index: 0,
    catIds: ['admin', 'prog', 'montage', 'drink', 'activities', 'guests', 'camping', 'finances', 'website'],
  };

  
  

  loadData(force) {
    if (!this.props.token) { return; }

    if (force || this.state.index !== this.state.loadedIndex) {
      var options = { headers: { 'Authorization': this.props.token } };
      var url = '/tasks?categoryId=' + this.state.catIds[this.state.index];
      axios.get(url, options)
        .then(response => {
          const currTasks = response.data.tasks;
          const updatedTasks = currTasks.map(
            task => { return { ...task }; }
          );
          this.setState({ tasks: updatedTasks, loadedIndex: this.state.index, error: false });
        }).catch(error => {
          console.log(error);
          this.setState({ error: true, loadedIndex: this.state.index })
        });
    }
  }

  handleSelect = (event, value) => {
    if (this.state.index !== value) {
      this.props.onSelect(this.state.catIds[value]);
      this.setState({ index: value });
    }
  };

  componentDidMount() {
    this.loadData(false);
  }

  componentDidUpdate() {
    this.loadData(false);
  }

  newTaskHandler = (catId, desc) => {
    const data = {
      categoryId: catId,
      desc: desc,
    };
    const options = { headers: { 'Authorization': this.props.token } };
    axios.post('/tasks', data, options)
      .then(response => {
        this.loadData(true);
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  putTask = (task) => {
    const options = { headers: { 'Authorization': this.props.token } };
    var url = task.id.length > 0 ? '/tasks/' + task.id : '/tasks';
    axios.post(url, task, options)
      .then(response => {
        this.loadData(true);
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
    console.log('Close #', task);
  }

  closeTask = (task) => {
    task.closeDate = Math.round(moment().valueOf() / 1000);
    this.putTask(task);
  }

  removeTask = (id) => {
    const options = { headers: { 'Authorization': this.props.token } };
    axios.delete('/tasks/' + id, options)
      .then(response => {
        this.loadData(true);
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
    console.log('Remove #', id);
  }

  render() {
    return (
      <StyledCard
        selectedTabIndex={this.state.index}
        selectedTabId={this.state.catIds[this.state.index]}
        onSelect={this.handleSelect}
        onCreateNew={this.newTaskHandler}
        onChange={() => this.loadData(true)}
        tasks={this.state.tasks}
        closeTask={this.closeTask}
        editTask={this.putTask}
        removeTask={this.removeTask}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    userRoles: state.auth.userRoles,
  };
};

export default connect(mapStateToProps)(TasksCard);
