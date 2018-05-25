import React from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//CardActions,, CardTitle
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    // maxWidth: 345,
    width: 345,
    margin: '1em'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};


function subTitle(props) {
  // const subTitle = (props) => {

  const dateStr = moment(props.date * 1000).format('MMMM Do')
  let subtitle = props.author + ', on ' + dateStr + '. ';

  let tagArr = props.tags.split(' ');
  for (let i in tagArr) {
    if (tagArr[i] !== props.currId) {
      subtitle = subtitle + ' #' + tagArr[i];
    }
  }

  let commentStr = null;
  if (parseInt(props.commentCount, 10) > 0) {
    commentStr = (
      <div style={{ align: 'left', marginLeft: '10px' }}>
        <Icon style={{ marginLeft: '0.2em', opacity: '0.6', fontSize: '1.2em' }}>comment</Icon>
        <span style={{ marginLeft: '4px', verticalAlign: 'top' }}> {props.commentCount}</span >
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'left' }}>
      {subtitle}
      {commentStr}
    </div>
  );
}

// alternative syntax
// function PostCard(props) {
const PostCard = (props) => {

  const { classes } = props;

  return (
    <div>
      <Card className={classes.card} onClick={props.clicked}>
        <CardMedia
          className={classes.media}
          image={"../imgRepo/" + props.thumb}
        // overlay does not work?? overlay={ <CardTitle title={props.title}/>}
        />
        <CardContent style={{ textAlign: 'left' }}>
          <Typography gutterBottom variant="headline" >
            {props.title}
          </Typography>
          {subTitle(props)}
          <Typography component="span">
            {props.desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);