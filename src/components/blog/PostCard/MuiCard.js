import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';


const PostCard = (props) => (
  <Card onClick={props.clicked}>
    {/* <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="images/jsa-128.jpg"
    /> */}
    <CardMedia
      overlay={<CardTitle title={props.title} subtitle={props.tags} />}
    >
      <img src={props.thumb} alt="" />
    </CardMedia>
    <CardTitle 
        //  title="Card title" */ } 
        subtitle={props.author+', on '+ moment(props.date).format('MMMM Do YYYY')} /> 
    <CardText>
        {props.desc}
    </CardText>
    {/* <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions> */}
  </Card>
);

export default PostCard;