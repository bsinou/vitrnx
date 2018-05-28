import React from 'react';
import { connect } from 'react-redux';
import axios from '../../apiServer';
import moment from 'moment';

import Tasks from '../../components/todo/Tasks';

import { categories } from "../../assets/conf/tasks.jsx";



import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TextField
} from 'material-ui';

import tasksCardStyle from "../../assets/jss/tasksCardStyle";


// TODO enhance
const tabStyle = { minWidth: '48px', maxWidth: '48px' };
const btnStyle = { paddingTop: '.4em', color: 'white', opacity: '0.8' };
const selBtnStyle = { paddingTop: '.4em', textDecoration: 'underline', color: 'black', opacity: '0.6' };

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

  handleSelected = event => {
    this.props.toggleFlag(event);
  }

  render() {
    const { classes, selectedTabIndex, onSelect, categories, tasks,
      closeTask, editTask, removeTask, showClosed, showAll } = this.props;

    let tabs = null;
    if (categories.length > 0) {
      tabs = categories.map(cat => (
        <Tab
          key={cat.id}
          style={tabStyle}
          classes={{
            wrapper: classes.tabWrapper,
            labelIcon: classes.labelIcon,
            label: classes.label,
          }}
          icon={<Icon className={classes.tabIcon}>{cat.icon}</Icon>}
        />
      ));
    }

    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          // title="TODO"
          action={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'inherit' }} >
              <IconButton
                tooltip={<span>Show closed tasks</span>}
                style={showClosed ? selBtnStyle : btnStyle}
                aria-label="Show closed tasks"
                onClick={() => this.handleSelected('showClosed')}
              >
                <Icon>playlist_add_check</Icon>
              </IconButton>
              {/* <IconButton
                onClick={() => this.handleSelected('showAll')}
                style={showAll ? selBtnStyle : btnStyle}
                aria-label="Show all tasks"
              >
                <Icon>people_outline</Icon>
              </IconButton> */}
              <Tabs
                classes={{
                  flexContainer: classes.tabsContainer,
                  //   indicator: classes.displayNone
                }}
                value={selectedTabIndex}
                onChange={onSelect}
                textColor="inherit"
                scrollable
              // scrollButtons="auto"
              >
                {tabs}
              </Tabs>
            </div>
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
    showClosed: false,
    showAll: false,
    categories: [],
    catIds: [],
  };




  loadData(force) {
    if (!this.props.token) { return; }

    if (force || this.state.index !== this.state.loadedIndex) {
      var options = { headers: { 'Authorization': this.props.token } };
      var url = '/tasks?categoryId=' + this.state.catIds[this.state.index]
        + '&showClosed=' + this.state.showClosed + '&showAll=' + this.state.showAll;
      axios.get(url, options)
        .then(response => {
          console.log(response.data.tasks);
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

  handleFlagToggle = (event) => {
    let id = event;
    this.setState({ [id]: !this.state[id] });
  }

  componentDidMount() {
    var currCats = [];
    var currCatIds = [];
    for (let cat in categories) {
      // Skip unauthorised categories
      if (!this.props.userRoles.includes(categories[cat].role)) continue;
      currCats.push(categories[cat]);
      currCatIds.push(categories[cat].id);
    }
    this.setState({ categories: currCats, catIds: currCatIds });
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
        categories={this.state.categories}
        selectedTabIndex={this.state.index}
        selectedTabId={this.state.catIds ? this.state.catIds[this.state.index] : null}
        onSelect={this.handleSelect}
        onCreateNew={this.newTaskHandler}
        onChange={() => this.loadData(true)}
        tasks={this.state.tasks}
        closeTask={this.closeTask}
        editTask={this.putTask}
        removeTask={this.removeTask}
        toggleFlag={this.handleFlagToggle}
        showClosed={this.state.showClosed}
        showAll={this.state.showAll}
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
