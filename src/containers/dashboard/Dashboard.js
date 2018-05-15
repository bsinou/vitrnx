import React from 'react';
import { connect } from 'react-redux';

import TasksCard from '../todos/TasksCard';

import Grid, { GridListTile } from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


// The Dashboard component manages routes and provides a default layout
class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <Grid container>
                    <GridListTile xs={12} sm={12} md={6}>
                        <TasksCard />
                    </GridListTile>
                </Grid>
            </div>
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

export default connect(mapStateToProps)(Dashboard);
