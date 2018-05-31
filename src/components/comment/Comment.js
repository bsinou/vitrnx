import React from 'react';
import moment from 'moment';
import axios from '../../apiServer'

import Markdown from 'react-markdown';

import EditButtons from './EditButtons';

// Styling
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Input, Paper } from '@material-ui/core';
import customClasses from './Comment.css';

export default class Comment extends React.Component {

  state = {
    // Manage dialog state
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      initialBody: this.props.comment.body,
      updatedBody: this.props.comment.body,
    }
  }

  canEdit() {
    return this.props.userRoles.includes("MODERATOR") || this.props.userId === this.props.comment.authorId;
  }

  /* UPDATE */

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCancelUpdate = () => {
    this.setState({ open: false, updatedBody: this.state.initialBody });
  };

  handleDoUpdate = () => {
    const data = {
      ...this.props.comment,
      body: this.state.updatedBody,
    };
    const options = { headers: { 'Authorization': this.props.token } };
    axios.post('/comments', data, options)
      .then(response => {
        this.setState({ open: false, initialBody: this.state.updatedBody });
        this.props.onCommentChange();
      }).catch(error => {
        console.log(error);
      });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.handleDoUpdate()
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  /* DELETION */
  deleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      var options = { headers: { 'Authorization': this.props.token } };
      axios.delete('/comments/' + this.props.comment.id, options).then(response => {
        this.props.onCommentChange();
      });
    }
  }

  render() {
    // Unix time is in full seconds and moment expects ms
    let dateStr = moment(this.props.comment.date * 1000).format('MMM D, YYYY');
    return (
      <div  >
        <Dialog
          open={this.state.open}
          onClose={this.handleCancelUpdate}
          aria-labelledby="form-dialog-title"
        >
          <Paper style={{ backgroundColor: '#fff', opacity: '0.95' }}>
            <DialogTitle id="edit-comment-dialog-title">Edit your comment</DialogTitle>
            <DialogContent >
              <Input
                style={{ minWidth: '320px' }}
                autoFocus
                multiline
                fullwidth
                rows="4"

                value={this.state.updatedBody}
                onChange={this.handleChange('updatedBody')}
                onKeyPress={this.handleKeyPress}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDoUpdate} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Paper>
        </Dialog>

        <div className={customClasses.CommentBox}>
          <div className={customClasses.CommentMeta}>
            {this.props.comment.author + ', ' + dateStr}
            {this.canEdit() ? (<EditButtons className={customClasses.AllBtnBox} onEdit={this.handleOpen} onDelete={this.deleteComment} />) : null}
          </div>
          <Markdown className={customClasses.CommentBody} escapeHtml={true} source={this.props.comment.body} />
        </div>
        <Divider />
      </div>
    );
  }
}
