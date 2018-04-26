import React, { Component } from 'react';
import apiServer from '../../../apiServer';
import moment from 'moment';

// Import the Markdown component
import Markdown from 'react-markdown';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import PostInfo from '../PostInfo/PostInfo';

import classes from './Post.css';

class Post extends Component {
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
        const cId = this.props.match.params.id;
        if (cId) {
            if (!this.state.loadedPost || this.state.loadedPost.path !== cId) {
                var options = { headers: { 'Authorization': this.props.token } };
                apiServer.get('/posts/' + cId, options).then(response => {
                    console.log(response.data)
                    this.setState({ loadedPost: response.data.post });
                });
            }
        }
    }

render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
        post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
        post = (
            <div className={classes.Post}>
                <Card>
                    <CardMedia>
                        <img src={"../imgRepo/" + this.state.loadedPost.hero} alt="" />
                    </CardMedia>
                    <CardTitle
                        title={this.state.loadedPost.title} />
                </Card>

                <div className={classes.Title}>{this.state.loadedPost.title}</div>
                <PostInfo tags={this.state.loadedPost.tags} date={this.state.loadedPost.date} author={this.state.loadedPost.author} />
                <div className={classes.Desc}>{this.state.loadedPost.desc}</div>
                {/* Render the body as a markdown component */}
                <Markdown className={classes.Body} escapeHtml={true} source={this.state.loadedPost.body} />
            </div>
        );
    }
    return post;
}
}

export default Post;