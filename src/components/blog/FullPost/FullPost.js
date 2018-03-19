import React, { Component } from 'react';
import axios from 'axios';

// Import the Markdown component
import Markdown from 'react-markdown';

import PostInfo from '../PostInfo/PostInfo';

import classes from './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
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
            if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.match.params.id) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className={classes.FullPost}>
                    <div className={classes.PageTitle}>{this.state.loadedPost.title}</div>
                    <PostInfo tags={this.state.loadedPost.tags} author={this.state.loadedPost.author} />
                    <div className={classes.PageSubtitle}>{this.state.loadedPost.desc}</div>
                    {/* Render the body as a markdown component */}
                    <Markdown className={classes.PageBody} escapeHtml={true} source={this.state.loadedPost.body} />
                </div>
            );
        }
        return post;
    }
}

export default FullPost;