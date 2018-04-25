
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player'

import Button from '../../components/ui/Button/Button';

import classes from './Teaser.css';


class Teaser extends Component {
    state = {
        url: 'https://40.sinou.org/EcceHomo4.mp4',
        playing: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
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

    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }

    render() {

        const { url, playing, volume, muted, loop, playbackRate } = this.state

        return (
            <div className={classes.Box}>
                <div  className={classes.InColumn}>
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        url={url}
                        playing={playing}
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
                <br />
                <div className={classes.InColumn} >
                    <Button clicked={this.playPause} btnType="Success">{playing ? 'PAUSE' : 'PLAY'}</Button>
                    <Button clicked={this.onClickFullscreen} btnType="Danger">FULLSCREEN</Button>
                    {/* <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                    <button onClick={}>Fullscreen</button> */}
                </div>
            </div>
        );
    }
}

export default Teaser; 