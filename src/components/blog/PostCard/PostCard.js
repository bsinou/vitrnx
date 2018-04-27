import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import moment from 'moment';

// See:
// Main concepts and shown examples:  https://material.io/guidelines/components/cards.html
// Examples with code: http://www.material-ui.com/#/components/card 

const PostCard = (props) => (
  <Card onClick={props.clicked}>
    <CardMedia overlay={<CardTitle title={props.title} subtitle={props.tags} />} >
      <img src={props.thumb} alt="" />
    </CardMedia>
    <CardTitle subtitle={props.author+', on '+ moment(props.date).format('MMMM Do YYYY')} /> 
    <CardText> {props.desc} </CardText>
  </Card>
);

export default PostCard;