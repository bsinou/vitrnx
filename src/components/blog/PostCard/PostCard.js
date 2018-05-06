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

  let subtitle = props.author + ', on ' + moment(props.date).format('MMMM Do') + '. ';

  let tagArr = props.tags.split(' ');
  for (let i in tagArr) {
    if (tagArr[i] !== props.currId) {
      subtitle = subtitle + ' #' + tagArr[i];
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {subtitle}
      <div style={{ marginLeft: '10px' }}>
        <img src={comment} alt="comment" />
        <span style={{ marginLeft: '4px', verticalAlign: 'top' }}>4</span >
      </div>
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
      <img style={{ height: '240px', width: '320px' }} src={props.thumb} alt={props.title + ' - image is not available'} />
    </CardMedia>
    <CardText style={{ textAlign: 'left', height: '60px', width: '320px' }}>
      <div>{props.desc}</div>
    </CardText>
  </Card>
);

export default PostCard;