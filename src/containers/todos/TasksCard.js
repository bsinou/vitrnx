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

import { VerifiedUser, Dashboard, Build, LocalBar, People } from "@material-ui/icons";

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
                indicator: classes.displayNone
              }}
              value={selectedTabIndex}
              onChange={onSelect}
              textColor="inherit"
            >
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  // textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<VerifiedUser className={classes.tabIcon} />}
              // label={"Admin"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  // textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<Dashboard className={classes.tabIcon} />}
              // label={"Prog"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  // textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<Build className={classes.tabIcon} />}
              // label={"Montage"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  // textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<LocalBar className={classes.tabIcon} />}
              // label={"Drinks..."}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  // textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<People className={classes.tabIcon} />}
              // label={"Guests"}
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
    catIds: ['admin', 'prog', 'montage', 'foodAndDrink', 'guests'],
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
          console.log(this.state.index);

          this.setState({ tasks: updatedTasks, loadedIndex: this.state.index, error: false });
        }).catch(error => {
          console.log(error);
          this.setState({ error: true, loadedIndex: this.state.index })
        });
    }
  }

  handleSelect = (event, value) => {
    console.log(this.state.catIds[value], 'Selected', value, this.state.index)
    if (this.state.index !== value) {
      this.setState({ index: value });
    }
  };

  componentDidMount() {
    console.log('Did mount')
    this.loadData(false);
  }

  componentDidUpdate() {
    console.log('Did update')
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

  editTask = (id) => {
    console.log('Edit #', id);
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
        tasks={this.state.tasks}
        closeTask={this.closeTask}
        editTask={this.editTask}
        removeTask={this.removeTask}
      />
    );
    //   <Card className={classes.card}>
    //     <CardHeader
    //       classes={{
    //         root: classes.cardHeader,
    //         title: classes.cardTitle,
    //         content: classes.cardHeaderContent
    //       }}
    //       title="TODO"
    //       action={
    //         <Tabs
    //           classes={{
    //             flexContainer: classes.tabsContainer,
    //             indicator: classes.displayNone
    //           }}
    //           value={this.state.value}
    //           onChange={this.handleChange}
    //           textColor="inherit"
    //         >
    //           <Tab
    //             classes={{
    //               wrapper: classes.tabWrapper,
    //               labelIcon: classes.labelIcon,
    //               label: classes.label,
    //               textColorInheritSelected: classes.textColorInheritSelected
    //             }}
    //             icon={<VerifiedUser className={classes.tabIcon} />}
    //           // label={"Admin"}
    //           />
    //           <Tab
    //             classes={{
    //               wrapper: classes.tabWrapper,
    //               labelIcon: classes.labelIcon,
    //               label: classes.label,
    //               textColorInheritSelected: classes.textColorInheritSelected
    //             }}
    //             icon={<Dashboard className={classes.tabIcon} />}
    //           // label={"Prog"}
    //           />
    //           <Tab
    //             classes={{
    //               wrapper: classes.tabWrapper,
    //               labelIcon: classes.labelIcon,
    //               label: classes.label,
    //               textColorInheritSelected: classes.textColorInheritSelected
    //             }}
    //             icon={<Build className={classes.tabIcon} />}
    //           // label={"Montage"}
    //           />
    //           <Tab
    //             classes={{
    //               wrapper: classes.tabWrapper,
    //               labelIcon: classes.labelIcon,
    //               label: classes.label,
    //               textColorInheritSelected: classes.textColorInheritSelected
    //             }}
    //             icon={<LocalBar className={classes.tabIcon} />}
    //           // label={"Drinks..."}
    //           />
    //           <Tab
    //             classes={{
    //               wrapper: classes.tabWrapper,
    //               labelIcon: classes.labelIcon,
    //               label: classes.label,
    //               textColorInheritSelected: classes.textColorInheritSelected
    //             }}
    //             icon={<People className={classes.tabIcon} />}
    //           // label={"Guests"}
    //           />
    //         </Tabs>
    //       }
    //     />
    //     <CardContent>
    //       <TextField
    //         fullWidth
    //         label="Create a task..."
    //         multiLine
    //         rows={2}
    //         rowsMax={4}
    //         value={this.state.newTaskDesc}
    //         onChange={this.handleDescChange}
    //         onKeyPress={this.handleKeyPress}
    //       />
    //       <Typography component="div">
    //         {/* <Tasks tasks={tasks} closeTask={(id) => this.closeTask(id)} editTask={(id) => this.editTask(id)} removeTask={(id) => this.removeTask(id)} /> */}
    //       </Typography>
    //     </CardContent>
    //   </Card>
    // );
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
