
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player'


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
        console.log('onPlay')
        this.setState({ playing: true })
    }
    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
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
            <div>
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
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
                {/* <ReactPlayer url='https://40.sinou.org/EcceHomo4.mp4' playing /> */}
            </div>
        );
    }
}

export default Teaser; 