import React from 'react';
import moment from 'moment';
import axios from '../../apiServer'

import Markdown from 'react-markdown';

import EditButtons from './EditButtons';

// Styling
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { Paper, Divider, TextField } from 'material-ui';


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
        // style={{zIndex: 1300, backgroundColor: '#fff', opacity: '0.5'}}
        >
          <Paper style={{ zIndex: 1300, backgroundColor: '#fff' }}>
            <DialogTitle id="edit-comment-dialog-title">Modify the comment</DialogTitle>
            <DialogContent >
              <TextField
                helperText="Edit your comment..."
                autoFocus
                multiline
                rowsMax="4"
                fullWidth
                value={this.state.updatedBody}
                onChange={this.handleChange('updatedBody')}
                onKeyPress={this.handleKeyPress}
              />
            </DialogContent>
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

