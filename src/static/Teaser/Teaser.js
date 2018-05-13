
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { NavLink } from 'react-router-dom';

import screenfull from 'screenfull'
import ReactPlayer from 'react-player'

import classes from './Teaser.css';

const videoPrefix = '/videoRepo/';

class Teaser extends Component {

    state = {
        // Bruno; p'tain fais un effort... 
        currPlayed: '',
        notP: '',

        playing: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,

        knownVideos: {
            ecce: {
                url: 'EcceHomo41.mp4',
                title: 'Ecce Homo',
                desc: 'Iooooo Guys. it\'s officialy launched, the Wonderful Festival 4.0 is on. To celebrate here is a first video'
            },
            dibu: {
                url: 'Dibujo.mp4',
                title: 'On a bien le droit de rêver...',
                desc: 'Ladies and Gentlemen, please welcome the second video of our grand contest, enjoy !'
            }
        }
    }

    switchVideo(){
        const p = this.props.match.params.id;
        if (this.state.currPlayed !==  p){
            const q = p === 'ecce' ? 'dibu' : 'ecce';
            console.log('DID MOUNT ', p, q)
            this.setState({
                currPlayed: p,
                notP: q,
            });
        }
    }
    
    componentDidMount() {
        this.switchVideo();
    }

    componentDidUpdate() {
        this.switchVideo();
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    onPlay = () => {
        this.setState({ playing: true })
    }
    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
        this.setState({ playing: true })
    }

    getVideo = (id) => videoPrefix + this.state.knownVideos[id].url;

    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(this.getVideo(url))}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }

    render() {
        let page = (<div> loading...</div>);

        if (this.state.currPlayed === 'ecce' || this.state.currPlayed === 'dibu') {
            console.log(this.state.currPlayed)

            const { currPlayed, notP, playing, volume, muted, loop, playbackRate, knownVideos } = this.state

            console.log('Here', notP, knownVideos);

            page = (<div className={classes.Box}>
                <div className={classes.PlayerBox} >
                    <h1>{knownVideos[currPlayed].title}</h1>
                    <p>{knownVideos[currPlayed].desc}</p>
                </div>

                <div className={classes.PlayerBox}>
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        url={this.getVideo(currPlayed)}
                        playing={playing}
                        controls={true}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
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
                <div className={classes.PlayerBox} >
                    <p> In case you missed it, check also {' '}
                        <NavLink to={'/v/' + notP} className="TextLink">
                            {'  ' +this.state.knownVideos[notP].title}
                        </NavLink>
                    </p>
                </div>
            </div>);
        }

        return page
    }
}

export default Teaser; 