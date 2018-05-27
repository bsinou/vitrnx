import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import {GridList, GridListTile, GridListTileBar, ListSubheader } from 'material-ui';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    height: 240,
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
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">What's new this week?</ListSubheader>
        </GridListTile>

        {posts.map(post => !post? null : (

          <GridListTile key={post.path} onClick={() => postSelected(post)}>
            <img src={'../imgRepo/'+post.thumb} alt={post.title} />
            <GridListTileBar
              title={post.title}
              subtitle={<span>by: {post.author}</span>}
            //   actionIcon={
            //     <IconButton className={classes.icon}>
            //       <InfoIcon />
            //     </IconButton>
            //   }
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