import React, { Component } from 'react';

import classes from './Posts.css';

import apiServer from '../../../apiServer';
import PostCard from '../PostCard/PostCard';
import MuiCard from '../PostCard/MuiCard';
import Aux from '../../../hoc/Aux/Aux';

import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        error: false
    }

    componentDidMount() {
        console.log('In Posts.componentDidMount(), props: ', this.props);
        // console.log('In Posts.componentDidMount(), route token: ', this.props.route.token);

        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

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

                // retrieve token from redux and pass it to axios
                var options = { headers: { 'Authorization': this.props.token } };

                apiServer.get('/posts?tag=' + this.props.match.params.id, options)
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
                    // TODO rather directly pass the object than the props one by one.
                    return (
                        <Aux>
                            {/* <PostCard
                                key={post.path}
                                path={post.path}
                                title={post.title}
                                tags={post.tags}
                                author={post.author}
                                desc={post.desc}
                                date={post.date}
                                // thumb={post.thumb}
                                thumb={"../imgRepo/" + post.thumb}
                                hero={post.hero}
                                clicked={() => this.postSelectedHandler(post.path)}
                            /> */}
                            <MuiCard
                                key={post.path}
                                path={post.path}
                                title={post.title}
                                tags={post.tags}
                                author={post.author}
                                desc={post.desc}
                                date={post.date}
                                // thumb={post.thumb}
                                thumb={"../imgRepo/" + post.thumb}
                                clicked={() => this.postSelectedHandler(post.path)}
                            />
                        </Aux>
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