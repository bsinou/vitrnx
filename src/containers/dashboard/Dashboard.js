import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from '../../apiServer';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import AuxWrapper from '../../hoc/AuxWrapper/AuxWrapper';
import TasksCard from '../todos/TasksCard';
import StatsCard from '../../components/dashboard/StatsCard'
import CategoryOverview from './CategoryOverview';


import { Grid, GridListTile } from 'material-ui';
import {
    Warning,
    People,
    FlightTakeoff
} from "@material-ui/icons";
import customCss from './Dashboard.css';
import { Paper } from 'material-ui';

class Dashboard extends React.Component {

    state = {
        currCategoryId: 'all',
        hasLoadedStats: false,
        guestsByDay: {
            totalAdults: 0,
            totalChildren: 0,
        }
    }

    // presence/guestsByDay
    loadStats() {
        if (!this.state.hasLoadedStat) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios.get('/presence/guestNb', options)
                .then(response => {
                    console.log(response)
                    this.setState({ guestsByDay: { ...response.data.guestsByDay }, hasLoadedStats: true });
                })
                .catch(error => {
                    console.log('Could not load stats', error)
                    this.setState({ hasLoadedStats: true });
                });
        }
    }

    componentDidMount() {
        this.loadStats()
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
        const { guestsByDay } = this.state
        return (
            <div className={customCss.Dashboard}>
                <Grid container style={{ padding: '1em' }}>
                    <Grid xs={12} sm={6} >
                        <Grid container style={{ padding: '1em' }}>
                            {this.state.currCategoryId !== 'all' ? null : (
                                <AuxWrapper>
                                    <Grid sm={6} md={6} style={{}}>
                                        <StatsCard
                                            icon={FlightTakeoff}
                                            iconColor="green"
                                            title={"" + this.getDaysToGo()}
                                            description="Days To Go"
                                            statIcon={Warning}
                                            statLink={{ text: "It's coming...", href: "#doSomething" }}
                                        />
                                    </Grid>
                                    <Grid sm={6} md={6}>
                                        <StatsCard
                                            icon={People}
                                            iconColor="orange"
                                            title={guestsByDay.totalAdults + guestsByDay.totalChildren}
                                            description="Guests"
                                            statIcon={People}
                                            statText={"Elves: " + guestsByDay.totalAdults + ", Dwarves: " + guestsByDay.totalChildren}
                                        />
                                    </Grid>
                                </AuxWrapper>
                            )}
                            <Grid sm={12} md={12} >
                                <CategoryOverview id={prefix + this.state.currCategoryId} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={6} >
                        <TasksCard
                            isDirty={true}
                            categoryId={this.state.currCategoryId}
                            onSelect={this.onCategoryUpdate}
                        />
                    </Grid>
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

export default withErrorHandler(connect(mapStateToProps)(Dashboard), axios);
