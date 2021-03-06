import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import apiServer, { publicServer } from '../../apiServer';

import { withStyles, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

function Post(props) {
    const { classes, post, postSelected } = props

    let dateStr = moment(post.date * 1000).format('MMMM Do YYYY');

    return (
        <ListItem onClick={postSelected}>
            <ListItemAvatar>
                <Avatar className={classes.avatar} src={"../imgRepo/" + post.thumb} />
            </ListItemAvatar>
            <ListItemText
                style={{ textAlign: 'left' }}
                primary={post.title + ', by ' + post.author + ' on ' + dateStr + ', ' + post.tags}
                secondary={post.desc}
            />
        </ListItem>
    );
}

const StyledPost = withStyles(styles)(Post);


class QueryPosts extends Component {

    state = {
        posts: [],
        query: null,
        error: false,
        showAll: true,
        loaded: false,

    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

        if (!this.state.loaded && (this.state.showAll || this.state.query)) {

            var url = this.state.query ? '/posts?query=' + this.state.query : '/posts';

            if (this.props.isAuth) {
                var options = { headers: { 'Authorization': this.props.token } };
                apiServer.get(url, options)
                    .then(response => {
                        const posts = response.data.posts;
                        const updatedPosts = posts.map(
                            post => { return { ...post }; }
                        );
                        this.setState({ posts: updatedPosts, loaded: true });
                    }).catch(error => {
                        console.log(error);
                        this.setState({ error: true, loaded: true })
                    });
            } else {
                publicServer.get(url, options)
                    .then(response => {
                        const posts = response.data.posts;
                        const updatedPosts = posts.map(
                            post => { return { ...post }; }
                        );
                        this.setState({ posts: updatedPosts, loaded: true });
                    }).catch(error => {
                        console.log(error);
                        this.setState({ error: true, loaded: true })
                    });
            }
        }
    }

    postSelectedHandler = (event, path) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.history.push('/p/' + path);
    };

    // TODO add new post component

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong: could not load post list...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => <StyledPost
                    key={post.path}
                    postSelected={(event) => this.postSelectedHandler(event, post.path)}
                    post={post} />);
        }
        return (<List>{posts}</List>);
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(QueryPosts);
