import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// import { Route } from 'react-router-dom'; 

import classes from './Posts.css';

// import axios from 'axios';
import apiServer from '../../../apiServer';
import Post from '../Post/Post';
// import FullPost from '../../components/blog/FullPost/FullPost';
// import NewPost from '../../components/blog/NewPost/NewPost';
import './Posts.css';
import { isNull } from 'util';

class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {
            if (!this.state.loadedCategory || this.state.loadedCategory !== this.props.match.params.id) {
                // axios.get( '/by-tag/' + this.props.match.params.id )
                // var authOptions = {
                //     method: 'GET',
                //     url: 'http://localhost:8888/api/posts',
                //     headers: {
                //         'Authorization': 'AUTH TOKEN',
                //         'Content-Type': 'application/json'
                //     },
                //     json: true
                // };
                apiServer.get( '/posts?tag=' + this.props.match.params.id )
                    // apiServer.post('/posts/')
                    .then(response => {
                        const posts = response.data.slice(0, 10);
                        const updatedPosts = posts.map(
                            post => {
                                console.log('Got a post')
                                return {
                                    ...post
                                }
                            }
                        );
                        this.setState({ posts: updatedPosts, error: false, loadedCategory: this.props.match.params.id });
                    }).catch(error => {
                        this.setState({ error: true, loadedCategory: this.props.match.params.id })
                        console.log(error);
                    });
            }
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push('/p/' + path);
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <Post
                            key={post.path}
                            path={post.path}
                            title={post.title}
                            author={post.author}
                            desc={post.desc}
                            date={post.createdOn}
                            clicked={() => this.postSelectedHandler(post.path)}
                        />
                    );
                });
        }
        return (
            <div className={classes.Posts}>
                <section>{posts}</section>
            </div>
        );
    }
}

export default Posts;