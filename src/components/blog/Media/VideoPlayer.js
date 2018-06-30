
import React from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'

import Markdown from 'react-markdown';


// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


import classes from './Media.css';

const videoPrefix = '/videoRepo/';

class VideoPlayer extends React.Component {

    state = {
        currPlayedPath: null,
        video: null,

        playing: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,

    }

    switchVideo() {
        const cId = this.props.path;
        if (cId && (!this.state.currPlayedPath || this.state.currPlayedPath !== cId)) {
            this.setState({ currPlayedPath: cId, video: this.props.video });
        }
    }

    componentDidMount() {
        this.switchVideo();
    }

    componentDidUpdate() {
        this.switchVideo();
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing });
    }

    onPlay = () => {
        this.props.onStartVideo();
        this.setState({ playing: true });
    }
    onPause = () => {
        console.log('onPause');
        this.setState({ playing: false });
    }

    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player));
        this.setState({ playing: true });
    }

    getVideo = (url) => {
        let res;
        if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
            res = url;
        } else {
            res = videoPrefix + url;
        }
        return res;
    }

    renderLoadButton = (video) => {
        return (
            <button onClick={() => this.load(this.getVideo(video.hero))}>
                {video.desc}
            </button>
        )
    }

    ref = player => {
        this.player = player;
    }

    render() {
        let page = (<div></div>);

        const { currPlayedPath, video, playing, volume, muted, loop, playbackRate } = this.state;

        if (currPlayedPath) {
            page = (
                <div className={classes.Box}>
                    <div className={classes.PlayerBox}>
                        <ReactPlayer
                            style={{ backgroundColor: '#333333' }}
                            ref={this.ref}
                            className='react-player'
                            url={this.getVideo(video.hero)}
                            playing={playing}
                            controls={true}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            // onReady={() => console.log('onReady')}
                            // onStart={() => console.log('onStart')}
                            onPlay={this.onPlay}
                            onPause={this.onPause}
                            onBuffer={() => console.log('onBuffer')}
                            onSeek={e => console.log('onSeek', e)}
                            onEnded={this.onEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                        />
                    </div>
                    <div className={classes.PlayerDesc}>
                        <div>
                            <h1>{video.title}</h1>
                        </div>
                        <div style={{ paddingTop: '5px', paddingLeft: '10px', }} > {video.desc} </div>
                        {/* <div> {video.body} </div> */}
                        <Markdown className={classes.Body} escapeHtml={true} source={video.body} />
                    </div>
                </div>);
        }
        return page;
    }
}

// const mapStateToProps = state => {
//     return {
//         isAuth: state.auth.token != null,
//         userRoles: state.auth.userRoles,
//         dname: state.auth.displayName,
//         currTrack: state.audio.currTrack,
//         status: state.audio.playing,
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        onStartVideo: () => dispatch(actions.forcePause()),
    };
};

export default connect(null, mapDispatchToProps)(VideoPlayer);
