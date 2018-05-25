
import React from 'react'
import { connect } from 'react-redux';
import axios from '../../../apiServer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Comments from '../../comment/Comments'
import VideoPlayer from './VideoPlayer'
import VideoCard from './VideoCard'

import { Grid } from 'material-ui';

class VideoPage extends React.Component {

    state = {
        currPlayedPath: null,
        videos: [],
    }

    loadVideos() {
        if (!this.props.token) { return; }

        if (this.state.videos.length === 0) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = '/posts?tag=Video';
            axios.get(url, options)
                .then(response => {
                    const posts = response.data.posts.slice(0, 12);
                    const updatedPosts = posts.map(
                        post => { return { ...post }; }
                    );
                    this.setState({ videos: updatedPosts });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    switchVideo() {
        const cId = this.props.match.params.id;
        if (cId && (!this.state.currPlayedPath || this.state.currPlayedPath !== cId)) {
            this.setState({ currPlayedPath: cId });
        }
    }

    getVideoMeta(path) {
        const vidz = this.state.videos;
        for (let i in vidz) {
            if (vidz[i].path === path) return vidz[i];
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push('/v/' + path);
    };

    handleVideoSelected = (video) => {
        this.postSelectedHandler(video.path)
    }

    componentDidMount() {
        this.loadVideos();
        this.switchVideo();
    }

    componentDidUpdate() {
        this.loadVideos();
        this.switchVideo();
    }

    render() {

        const { currPlayedPath, videos } = this.state

        let videoComps = videos.map(video => {
            return video.path === currPlayedPath ? null : (
                <VideoCard key={video.path} video={video} onSelect={this.handleVideoSelected}/>
            );
        });

        let page = (<div></div>);

        if (currPlayedPath && videos.length > 0) {
            console.log("Got a path to play", currPlayedPath)
            let currPlayed = this.getVideoMeta(currPlayedPath)

            page = (
                <Grid container style={{ padding: '1em', listStyle: 'none' }}>
                    <Grid s={12} md={8} lg={8} style={{}}>
                        <VideoPlayer path={currPlayedPath} video={currPlayed} />
                    </Grid>
                    <Grid sm={12} md={4} lg={4} style={{}}>
                        <h1>Check the other videos!</h1>
                        <div>{videoComps}</div>
                    </Grid>
                    <Grid sm={12} md={12} lg={12} style={{}}>
                        <Comments postId={currPlayed.path} />
                    </Grid>
                </Grid>
            );
        }
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

export default withErrorHandler(connect(mapStateToProps)(VideoPage), axios);
