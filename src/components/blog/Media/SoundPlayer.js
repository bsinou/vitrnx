
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Material UI
import { withStyles, Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 180,
    height: 180,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});


function MediaControlCard(props) {
  const { classes, theme, currTrack, status, onToggleStatus, onPreviousTrack, onNextTrack } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="/imgRepo/prog-hero.jpg"
          title="Live from space album cover"
        />

        <div className={classes.details}>

          <CardContent className={classes.content}>
            <Typography variant="headline">{currTrack.title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {currTrack.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous" onClick={onPreviousTrack}>
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="Play/pause" onClick={onToggleStatus}>
              {status ? <PauseIcon className={classes.pauseIcon} /> : <PlayArrowIcon className={classes.playIcon} />}
            </IconButton>
            <IconButton aria-label="Next" onClick={onNextTrack}>
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>

            </div>
          </div>
        </Card>
      </div>
    );
  }

  MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => {
    return {
      currTrack: state.audio.currTrack,
      status: state.audio.playing,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onToggleStatus: () => dispatch(actions.togglePlayingStatus()),
      onPreviousTrack: () => dispatch(actions.skipTrack(-1)),
      onNextTrack: () => dispatch(actions.skipTrack(1))
    };
  };


  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MediaControlCard));


