import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab
} from 'material-ui';

import { VerifiedUser, Dashboard, Build, LocalBar, People } from "@material-ui/icons";

import Tasks from '../../components/todo/Tasks';

import { admin, prog, montage, foodAndDrink, guests } from "../../assets/dummyData/todo.jsx";

import tasksCardStyle from "../../assets/jss/tasksCardStyle";

class TasksCard extends React.Component {
  
  state = {
    value: 0
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title="Tasks:"
          action={
            <Tabs
              classes={{
                flexContainer: classes.tabsContainer,
                indicator: classes.displayNone
              }}
              value={this.state.value}
              onChange={this.handleChange}
              textColor="inherit"
            >
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<VerifiedUser className={classes.tabIcon} />}
                label={"Admin"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<Dashboard className={classes.tabIcon} />}
                label={"Prog"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                icon={<Build className={classes.tabIcon} />}
                label={"Montage"}
              />
              <Tab
              classes={{
                wrapper: classes.tabWrapper,
                labelIcon: classes.labelIcon,
                label: classes.label,
                textColorInheritSelected: classes.textColorInheritSelected
              }}
              icon={<LocalBar className={classes.tabIcon} />}
              label={"Drinks..."}
            />
            <Tab
              classes={{
                wrapper: classes.tabWrapper,
                labelIcon: classes.labelIcon,
                label: classes.label,
                textColorInheritSelected: classes.textColorInheritSelected
              }}
              icon={<People className={classes.tabIcon} />}
              label={"Guests"}
            />
            </Tabs>
          }
        />
        <CardContent>
          {this.state.value === 0 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[0, 1]}
                tasksIndexes={[0, 1]}
                tasks={admin}
              />
            </Typography>
          )}
          {this.state.value === 1 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[0]}
                tasksIndexes={[0, 1, 2]}
                tasks={prog}
              />
            </Typography>
          )}
          {this.state.value === 2 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1, 2, 3]}
                tasks={montage}
              />
            </Typography>
          )}
          {this.state.value === 3 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1, 2, 3]}
                tasks={foodAndDrink}
              />
            </Typography>
          )}
          {this.state.value === 4 && (
            <Typography component="div">
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1]}
                tasks={guests}
              />
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(tasksCardStyle)(TasksCard);
