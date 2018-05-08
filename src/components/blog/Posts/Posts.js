import React, { Component } from 'react';

import apiServer from '../../../apiServer';

import PostCard from '../PostCard/PostCard';
import Aux from '../../../hoc/Aux/Aux';


// Material UI
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import classes from './Posts.css';
import './Posts.css';

export default class Posts extends Component {

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
                <div>
                    <ul className={classes.SideButtons} >
                        <li>
                            <FloatingActionButton
                                onClick={this.newPostHandler}
                                mini={true}
                                secondary={true}
                                style={{ marginRight: 14, marginTop: 10 }}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </li>
                    </ul>
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
                            className={classes.PostCard}
                            key={post.path}
                            currId={this.state.loadedCategory ? this.state.loadedCategory : 'all'}
                            clicked={() => this.postSelectedHandler(post.path)}
                            {...post}
                        />
                    );
                });
        }
        return (
            <Aux>
                {this.getAddBtn(this.state.canEdit)}
                <div className={classes.Posts}>
                    {posts}
                </div>
            </Aux>
        );
    }
}
