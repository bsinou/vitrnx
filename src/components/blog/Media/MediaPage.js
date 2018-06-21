
import React from 'react'
import { connect } from 'react-redux';
import axios from '../../../apiServer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Comments from '../../comment/Comments'
import VideoPlayer from './VideoPlayer'
import MediaCard from './MediaCard'

import { Grid } from '@material-ui/core';

class MediaPage extends React.Component {

    state = {
        currPlayedPath: null,
        medias: [],
    }

    loadMedia() {
        if (!this.props.token) { return; }

        if (this.state.medias.length === 0) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = '/posts?tag=Media';
            axios.get(url, options)
                .then(response => {
                    const posts = response.data.posts.slice(0, 12);
                    const updatedPosts = posts.map(
                        post => { return { ...post }; }
                    );
                    if (updatedPosts.length > 0 ){
                        this.setState({ medias: updatedPosts });

                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    switchMedia() {
        const cId = this.props.match.params.id;
        if (cId && (!this.state.currPlayedPath || this.state.currPlayedPath !== cId)) {
            this.setState({ currPlayedPath: cId });
        }
    }

    getMediaMeta(path) {
        const vidz = this.state.medias;
        for (let i in vidz) {
            if (vidz[i].path === path) return vidz[i];
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push('/v/' + path);
    };

    handleMediaSelected = (media) => {
        this.postSelectedHandler(media.path)
    }

    componentDidMount() {
        this.loadMedia();
        this.switchMedia();
    }

    componentDidUpdate() {
        this.loadMedia();
        this.switchMedia();
    }

    render() {

        const { currPlayedPath, medias } = this.state

        let mediaComps = medias.map(media => {
            return media.path === currPlayedPath ? null : (
                <MediaCard key={media.path} media={media} onSelect={this.handleMediaSelected} />
            );
        });

        let page = (<div></div>);

        if (currPlayedPath && medias.length > 0) {
            // console.log("Got a path to play", currPlayedPath)
            let currPlayed = this.getMediaMeta(currPlayedPath)
            // console.log("Got a media", currPlayed)

            // style={{}}

            page = (
                <Grid container style={{ padding: '1em', listStyle: 'none' }}>
                    <Grid item s={12} md={8} lg={8} >
                        {/* If video  */}
                        <VideoPlayer path={currPlayedPath} video={currPlayed} />
                        {/* else if audio  */}
                        {/* else null  */}

                    </Grid>
                    <Grid item sm={12} md={4} lg={4} >
                        <h3>Check the other videos!</h3>
                        <div style={{ padding: '10px', margin: '10px' }}>{mediaComps}</div>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12} >
                        {!currPlayed ? <div>currplayed is undefined</div> :
                            <Comments postId={currPlayed.path} />}
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

export default withErrorHandler(connect(mapStateToProps)(MediaPage), axios);
