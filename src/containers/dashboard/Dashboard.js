import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import TasksCard from '../todos/TasksCard';
import StatsCard from '../../components/dashboard/StatsCard'
import CategoryOverview from './CategoryOverview';


import { Grid, GridListTile } from 'material-ui';
import {
    Warning,
    DateRange,
    FlightTakeoff,
    People
} from "@material-ui/icons";
import customCss from './Dashboard.css';

class Dashboard extends React.Component {

    state = {
        currCategoryId: 'admin',
    }

    getDaysToGo() {
        var a = moment([2018, 6, 13]);
        var b = moment().valueOf();
        return a.diff(b, 'days') //
    }

    onCategoryUpdate = (id) => {
        this.setState({ currCategoryId: id })
    }

    render() {
        const prefix = 'orga-';  // FIXME: less prone to collision

        return (
            <div className={customCss.Dashboard}>
                <div className={customCss.DashboardCol}>
                    <CategoryOverview id={prefix + this.state.currCategoryId} />
                </div>
                <div className={customCss.DashboardCol}>
                    <Grid container style={{ overflow: 'visible', padding: '1em', listStyle: 'none' }}>
                        <GridListTile xs={4} sm={4} md={2} style={{}}>
                            <StatsCard
                                icon={FlightTakeoff}
                                iconColor="green"
                                title={"" + this.getDaysToGo()}
                                description="Days To Go"
                                statIcon={Warning}
                                statLink={{ text: "It's coming...", href: "#doSomething" }}
                            />
                        </GridListTile>
                        <GridListTile xs={4} sm={4} md={2}>
                            <StatsCard
                                icon={People}
                                iconColor="orange"
                                title="25"
                                description="Guests"
                                statIcon={DateRange}
                                statText="Last 24 Hours: -3"
                            />
                        </GridListTile>
                        {/* <GridListTile xs={4} sm={4} md={2} style={{}}>
                            <StatsCard
                                icon={FlightTakeoff}
                                iconColor="red"
                                title={"" + this.getDaysToGo()}
                                description="Budget"
                                statIcon={Warning}
                                statLink={{ text: "It's coming...", href: "#doSomething" }}
                            />
                        </GridListTile> */}
                        <GridListTile xs={8} md={4}>
                            <TasksCard
                                isDirty={true}
                                categoryId={this.state.currCategoryId}
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
