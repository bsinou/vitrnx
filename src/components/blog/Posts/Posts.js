import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// import { Route } from 'react-router-dom'; 

import classes from './Posts.css';

import axios from 'axios';
import Post from '../Post/Post';
// import FullPost from '../../components/blog/FullPost/FullPost';
// import NewPost from '../../components/blog/NewPost/NewPost';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedCategory || this.state.loadedCategory !== this.props.match.params.id)  {
                axios.get( '/by-tag/' + this.props.match.params.id )
                    .then( response => {
                        const posts = response.data.slice(0, 10);
                        const updatedPosts = posts.map(
                            post => {
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

    postSelectedHandler = (id) => {
        this.props.history.push('/p/' + id);
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            desc={post.desc}
                            date={post.date}
                            clicked={() => this.postSelectedHandler(post.id)}
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