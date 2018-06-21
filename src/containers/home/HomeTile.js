import React from 'react';
import SoundPlayer from '../../components/blog/Media/SoundPlayer';
import PropTypes from 'prop-types';

import { withStyles, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 240,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function TitlebarGridList(props) {
  const { classes, posts, postSelected } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {posts.map(post => !post ? null : (
          post.type && post.type === 'soundPlayer' ?

            <GridListTile key={post.path} >
              < SoundPlayer post={post} />

              {/* < SoundPlayer post={post} /> */}
            </GridListTile>
            :
            <GridListTile key={post.path} onClick={() => postSelected(post)}>
              <img src={'../imgRepo/' + post.thumb} alt={post.title} />
              <GridListTileBar
                title={post.title}
                subtitle={<span>by: {post.author}</span>}
              />
            </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);