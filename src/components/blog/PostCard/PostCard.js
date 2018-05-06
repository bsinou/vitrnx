import React from 'react';
import moment from 'moment';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import comment from '../../../assets/images/ic_comment_white_18px.svg';

// See:
// Main concepts and shown examples:  https://material.io/guidelines/components/cards.html
// Examples with code: http://www.material-ui.com/#/components/card 

var cardStyle = {
  margin: '8px'
}

function subtitle(props) {

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
      <div style={{ marginLeft: '10px' }}>
        <span style={{ marginLeft: '4px', verticalAlign: 'top' }}> {"  "}</span >
        <img src={comment} style={{ opacity: '0.8' }}  alt="comment" />
        <span style={{ marginLeft: '4px', verticalAlign: 'top' }}> {"  "+props.commentCount+ " "}</span >
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {subtitle}
      {commentStr}
    </div>
  );
}

const PostCard = (props) => (
  <Card style={cardStyle} onClick={props.clicked}>
    <CardMedia
      style={{ height: '240px' }}
      overlay={
        <CardTitle
          title={props.title}
          subtitle={
            subtitle(props)
          }
        />
      }
    >
      <img style={{ height: '240px', width: '320px' }} src={"../imgRepo/" +props.thumb} alt={props.title + ' - image is not available'} />
    </CardMedia>
    <CardText style={{ textAlign: 'left', height: '60px', width: '320px' }}>
      <div>{props.desc}</div>
    </CardText>
  </Card>
);

export default PostCard;