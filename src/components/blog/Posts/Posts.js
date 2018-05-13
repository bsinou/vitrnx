import React, { Component } from 'react';

import apiServer from '../../../apiServer';

import { withStyles } from 'material-ui/styles';


import PostCard from '../PostCard/PostCard';
import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper';


// Material UI
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon'

import classes from './Posts.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        error: false
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

        if (this.props.match.params.id) {
            if (!this.state.loadedCategory || this.state.loadedCategory !== this.props.match.params.id) {

                var options = { headers: { 'Authorization': this.props.token } };
                var url = '/posts?tag=' + this.props.match.params.id;
                apiServer.get(url, options)
                    .then(response => {
                        const posts = response.data.posts.slice(0, 12);
                        const updatedPosts = posts.map(
                            post => { return { ...post }; }
                        );
                        this.setState({ posts: updatedPosts, loadedCategory: this.props.match.params.id });
                    }).catch(error => {
                        console.log(error);
                        this.setState({ error: true, loadedCategory: this.props.match.params.id })
                    });
            }
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push('/p/' + path);
    };

    newPostHandler = () => {
        console.log(this.props.history);
        this.props.history.push('/p/edit');
    };


    canCreatePost = () => {
        return this.props.userRoles.includes("EDITOR") || this.props.userRoles.includes("MODERATOR");
    }


    getAddBtn = () => {
        let btns = null;
        if (this.canCreatePost()) {
            btns = (
                <div className={classes.SideButtons}>
                    <Button
                        // variant="fab"
                        color="primary"
                        aria-label="add"
                        className={classes.button}
                        onClick={this.newPostHandler}
                        // mini="true"
                        // style={{ marginRight: 14, marginTop: 10 }}
                        >
                        <Icon>add_circle</Icon>
                    </Button>
                </div>
            );
        }
        return btns;
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong: could not load post list...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <PostCard
                            key={post.path}
                            currId={this.state.loadedCategory ? this.state.loadedCategory : 'all'}
                            clicked={() => this.postSelectedHandler(post.path)}
                            {...post}
                        />
                    );
                });
        }
        return (
            <AuxWrapper>
                {this.getAddBtn()}
                <div className={classes.Posts}>
                    {posts}
                </div>
            </AuxWrapper>
        );
    }
}

export default withStyles(styles)(Posts);