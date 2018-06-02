
import React from 'react';
import { connect } from 'react-redux';
import axios from '../../apiServer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Markdown from 'react-markdown';

import Comment from '../../components/comment/Comment';
import HomeTile from './HomeTile';

import { Grid } from '@material-ui/core';

import classes from './Home.css'

class Home extends React.Component {

    state = {
        homePost: null,
        lastNews: null,
        lastVideo1: null,
        lastVideo2: null,
        lastVideo3: null,
        lastBand: null,
        comments: [],
        addresses: null,
    }

    loadPost(id, url, force) {
        if (!this.props.token) { return; }

        if (!this.state[id] || force) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios.get(url, options)
                .then(response => {
                    // console.log('Got a post, about to set', response)
                    if (id === "homePost") {
                        this.setState({ homePost: response.data.post });
                    } else if (id === "lastNews") this.setState({ lastNews: response.data.posts[0] });
                    else if (id === "lastVideo") this.setState({ lastVideo1: response.data.posts[0], lastVideo2: response.data.posts[1], lastVideo3: response.data.posts[2]  });
                    else if (id === "lastBand") this.setState({ lastBand: response.data.posts[0] });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    loadComments(force) {
        if (!this.props.token) { return; }
        if (force || this.state.comments.length === 0) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = '/comments';
            axios.get(url, options)
                .then(response => {
                    const cs = response.data.comments.slice(0, 48);
                    this.setState({ comments: cs });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    postSelectedHandler = (post) => {
        let path;
        if (post.tags.indexOf("Video") !== -1){
            path = '/v/'+post.path;
        } else {
            path = '/p/'+post.path;
        }
        this.props.history.push(path);
    };

    refreshContent(force) {
        this.loadPost("homePost", "/posts/home", force)
        this.loadPost("lastNews", "/posts?tag=News&count=1", force)
        this.loadPost("lastVideo", "/posts?tag=Video", force)
        this.loadPost("lastBand", "/posts?tag=Band&count=1", force)
        this.loadComments(force)
    }

    componentDidMount() {
        this.refreshContent(false);
    }

    render() {

        const { homePost, lastNews, lastVideo, lastBand, comments } = this.state;

        let commentArr = [];

        if (comments) {
            commentArr = comments.map(
                comment => {
                    return (
                        <Comment
                            style={{}}
                            key={comment.id}
                            onCommentChange={() => this.loadData(true)}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                            comment={comment}
                        />
                    );
                });
        }


        let page = (
            <Grid container justify="center" style={{ direction: 'row' }}>
                <Grid item className={classes.Paper} sm={12} md={8} lg={8}  >
                    <Grid item className={classes.Paper} sm={12} style={{}}>
                        {!homePost ? null : (
                            <div>
                                <h1>{homePost.title}</h1>
                                <Markdown className={classes.Body} escapeHtml={true} source={homePost.body} />
                            </div>
                        )}
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container justify="center" className={classes.Paper} style={{ direction: 'row' }} >
                            {!lastNews ? null : ( //, this.state.
                                <HomeTile postSelected={this.postSelectedHandler} posts={[lastNews, lastVideo, lastBand]} />
                            )}
                         </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.Paper} sm={12} md={3} lg={3} style={{}}>
                    <div>
                        <h3>Recent comments:</h3>
                    </div>
                    <div>{commentArr.length > 0 ? commentArr : null}</div>
                </Grid>
            </Grid>
        );
        return page
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        userRoles: state.auth.userRoles
    };
};

export default withErrorHandler(connect(mapStateToProps)(Home), axios);
