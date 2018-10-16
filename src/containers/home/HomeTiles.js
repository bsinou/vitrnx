import React from 'react';
import SoundPlayer from '../../components/blog/Media/SoundPlayer';
import PropTypes from 'prop-types';

import { withStyles, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // minWidth: '48em',
    // height: 240,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function HomePageGridList(props) {
  const { classes, posts, postSelected } = props;

  let colNb = 1;
  if (window.innerWidth > 1499) colNb = 3;
  else if (window.innerWidth > 499) colNb = 2;
 
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={colNb}>
        {posts.map(post => !post ? null : (
          post.type && post.type === 'soundPlayer' ?
            <GridListTile key={post.path} >
              <SoundPlayer post={post} />
            </GridListTile>
            :
            <GridListTile key={post.path} onClick={() => postSelected(post)}>
              <img src={'../files/images/' + post.thumb} alt={post.title} />
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

HomePageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePageGridList);