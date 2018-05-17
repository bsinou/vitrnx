import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from '../../apiServer';

import TasksCard from '../todos/TasksCard';
import StatsCard from '../../components/dashboard/StatsCard'
import { Grid, GridListTile, Paper} from 'material-ui';


import {
    ContentCopy,
    Store,
    InfoOutline,
    Warning,
    DateRange,
    LocalOffer,
    Update,
    ArrowUpward,
    AccessTime,
    Accessibility,
    FlightTakeoff, 
    People
} from "@material-ui/icons";


import { admin, prog, montage, foodAndDrink, guests } from "../../assets/dummyData/todo.jsx";


// The Dashboard component manages routes and provides a default layout
class Dashboard extends React.Component {

    getDaysToGo() {
        var a = moment([2018, 6, 13]);
        var b = moment().valueOf();
        return a.diff(b, 'days') //
    }

    onCategoryUpdate = (id, force) => {
        console.log('Update to category ', id)
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    OK guy, now we have to move on...
                </div>
                <div>
                    <Grid container style={{ overflow: 'visible', padding: '1em', listStyle: 'none' }}>
                        <GridListTile xs={12} sm={6} md={6} style={{}}>
                            <StatsCard
                                icon={FlightTakeoff}
                                iconColor="green"
                                title={"" + this.getDaysToGo()}
                                description="Days To Go"
                                statIcon={Warning}
                                statLink={{ text: "It's coming...", href: "#doSomething" }}
                            />
                        </GridListTile>
                        <GridListTile xs={12} sm={6} md={6}>
                            <StatsCard
                                icon={People}
                                iconColor="orange"
                                title="25"
                                description="Guests"
                                statIcon={DateRange}
                                statText="Last 24 Hours: -3"
                            />
                        </GridListTile>
                        <GridListTile xs={12} sm={12} md={12} style={{ overflow: 'visible' }}>
                            <TasksCard 
                                style={{ overflow: 'visible' }} 
                                isDirty={true}
                                categoryId="admin"
                                onSelect={this.onCategoryUpdate} 
                            />
                        </GridListTile>
                    </Grid>
                </div>
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
