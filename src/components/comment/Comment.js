import React from 'react';
import moment from 'moment';
import axios from '../../apiServer'

import Markdown from 'react-markdown';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


// Styling
import editIcon from '../../assets/images/edit_1x.png';
import deleteIcon from '../../assets/images/delete_1x.png';
import classes from './Comment.css';


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

  // componentDidUpdate() {
  //   this.setState( {
  //     open: false,
  //     initialBody: this.props.body,
  //     updatedBody: this.props.body,
  //   })
  // }

  canEdit() {
    return this.props.userRoles.includes("MODERATOR") || this.props.userId === this.props.comment.authorId;
  }

  getEditBtn = (token, id, authorId, onCommentChange) => {
    let btns = null;
    if (this.canEdit()) {
      btns = (
        <div className={classes.AllBtnBox}>
          <ul className={classes.CommentButtons} >
            <li>
              <div className={classes.SingleBtnBox} onClick={() => this.deleteComment(token, id, onCommentChange)}>
                <img src={deleteIcon} alt="remove comment" />
              </div>
            </li>
            <li>
              <div className={classes.SingleBtnBox} onClick={this.handleOpen}>
                <img src={editIcon} alt="edit comment" />
              </div>
            </li>
          </ul>
        </div>
      );
    }
    return btns;
  }


  /* DELETION */

  deleteComment(token, id, onCommentChange) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      var options = { headers: { 'Authorization': token } };
      axios.delete('/comments/' + id, options).then(response => {
        onCommentChange();
      });
    }
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

  handleDoUpdate = () =>  {
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

  handleBodyChange = (e) => {
    this.setState({
      updatedBody: e.target.value
    });
  }

  render() {
    // Update dialog action 
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleCancelUpdate} />,
      <FlatButton label="Submit" primary={true} onClick={() => this.handleDoUpdate(this.props.token, this.props.comment, this.props.onCommentChange)} />,
    ];


    // Unix time is in full seconds and moment expects ms
    let dateStr = moment(this.props.comment.date * 1000).format('MMM D, YYYY');
    return (

      <div className={classes.CommentBox} >
        {this.getEditBtn(this.props.token, this.props.comment.id, this.props.comment.authorId, this.props.onCommentChange)}

        <Dialog title="" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleCancelUpdate} >
          <TextField
            floatingLabelText="Edit your comment..."
            fullWidth
            multiLine={true}
            rows={2}
            rowsMax={4}
            value={this.state.updatedBody}
            onChange={this.handleBodyChange}
            onKeyPress={this.handleKeyPress}
          />
        </Dialog>

        <div>
          <div className={classes.CommentMeta}>{this.props.comment.author}, {dateStr}</div>
          <Markdown className={classes.CommentBody} escapeHtml={true} source={this.props.comment.body} />
        </div>
        <Divider />
      </div>
    );
  }
}

