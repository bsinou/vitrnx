
import React from 'react';
import { connect } from 'react-redux';
import axios from '../../apiServer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Markdown from 'react-markdown';

import { Grid } from 'material-ui';

import classes from './Home.css'

class Home extends React.Component {

    state = {
        homePost: null,
        lastNews: null,
        lastVideo: null,
        lastBand: null,
        comments: [],
        addresses: null,
    }

    loadPost(id, url, force) {
        if (!this.props.token) { return; }

        console.log('Getting post:', id, url, force)
        console.log(this.state)

        if (!this.state[id] || force) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios.get(url, options)
                .then(response => {
                    console.log('Got a post, about to set', response)
                    if (id === "homePost") {
                        this.setState({ homePost: response.data.post });
                    } else if (id === "lastNews") this.setState({ lastNews: response.data.post });
                    else if (id === "lastVideo") this.setState({ lastVideo: response.data.post });
                    else if (id === "lastBand") this.setState({ lastBand: response.data.post });
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
                    const cs = response.data.posts.slice(0, 48);
                    this.setState({ comments: cs });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push(path);
    };

    refreshContent(force) {
        this.loadPost("homePost", "/posts/home", force)
        this.loadPost("lastNews", "/posts?tag=News&count=1", force)
        this.loadPost("lastVideo", "/posts?tag=Video&count=1", force)
        this.loadPost("lastBand", "/posts?tag=Band&count=1", force)
        this.loadComments(force)
    }

    componentDidMount() {
        this.refreshContent(false);
    }

    // componentDidUpdate() {
    //     this.loadVideos();
    //     this.switchVideo();
    // }

    render() {

        const { homePost, lastNews, lastVideo, lastBand, comments, addresses } = this.state;
        let page = (
            <Grid container justify="center" style={{ direction: 'row' }}>
                <Grid className={classes.Paper} sm={12} md={8} lg={8}  >
                    <Grid className={classes.Paper} sm={12} style={{}}>
                        {!homePost ? null : (
                            <div>
                                <h1>{homePost.title}</h1>
                                <Markdown className={classes.Body} escapeHtml={true} source={homePost.body} />
                            </div>
                        )}
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container justify="center" className={classes.Paper} xs={12} style={{ direction: 'row' }} >
                            <Grid className={classes.Paper} xs={4} style={{}}>
                                lastNews
                            </Grid>
                            <Grid className={classes.Paper} xs={4} style={{}}>
                                lastVideo
                        </Grid>
                            <Grid className={classes.Paper} xs={4} style={{}}>
                                lastBand
                        </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid className={classes.Paper} sm={12} md={3} lg={3} style={{}}>
                    Comments
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