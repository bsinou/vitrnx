import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../apiServer';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';

import EditButtons from '../../ui/EditButtons/EditButtons';


// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
// Material UI
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

import classes from './EditPost.css';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};


const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles2 = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <div>
                    <List>
                        {emails.map(email => (
                            <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" />
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles2)(SimpleDialog);


class EditPost extends Component {
    state = {
        post: {},
        // Tab and MD editor management
        slideIndex: 0,
        htmlMode: 'raw',

        open: false
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        const currId = this.props.match.params.id;
        if (currId) {
            if (!this.state.post.path || this.state.post.path !== currId) {
                var options = { headers: { 'Authorization': this.props.token } };
                axios
                    .get('/posts/' + currId, options)
                    .then(response => {
                        this.setState({ post: { ...response.data.post } });
                    })
                    .catch(error => {
                        console.log('# could not load ' + currId, error)
                        this.setState({ post: { ...this.state.post, path: currId } });
                    });
            }
        }
    }

    postDataHandler = () => {
        var data = { ...this.state.post }
        var options = { headers: { 'Authorization': this.props.token } };

        axios.post('/posts', data, options).then(response => {
            console.log(response); // TODO Give feedback to the user, TODO also implement regular auto-save 
            this.setState({ post: { ...response.data.post } });
        }).catch(err => {
            console.log(err); // TODO handle error?
        });
    }

    deletePostHandler = () => {
        if (window.confirm('Are you sure you want to completely remove this post?')) {
            if (!this.state.post.id || this.state.post.id === "") {// No ID <=> new post, simply forward to cancel
                this.cancelHandler()
            }
            var options = { headers: { 'Authorization': this.props.token } };
            axios.delete('/posts/' + this.state.post.path, options).then(response => {
                this.props.history.goBack();
                // this.props.history.push('/q/News');
            });
        }
    };

    cancelHandler = () => {
        this.props.history.goBack();
    };

    canDelete = () => {
        return this.props.userRoles.includes("MODERATOR") || this.props.userId === this.state.post.authorId;
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    handleMarkdownChange = (evt) => {
        this.setState({ post: { ...this.state.post, body: evt.target.value } })
    }


    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    getEditBtns = () => {
        return (
            <div>
                <EditButtons
                    onSave={this.postDataHandler}
                    onCancel={this.cancelHandler}
                    onDelete={this.deletePostHandler} canDelete={this.canDelete} />

                {/* <ul className={classes.SideButtons} >
                    <li>
                        <Button
                            variant="fab"
                            aria-label="Save"
                            onClick={this.postDataHandler}
                            mini="true"
                        >
                            <Icon>save</Icon>
                        </Button>
                    </li>

                    {/* 
                        TODO : add tooltip
                        see: http://bluedesk.blogspot.de/2017/10/react-material-ui-fab-with-optional_18.html
                        or mui v1.00 => FAB have no tooltip before v1 (we're currently using v0.20) 
                    */}
                {/*                     
                    <li>
                        <Button
                            aria-label="cancel"
                            variant="fab"
                            color="secondary"
                            mini="true"
                            tooltip="back to the future :)"
                            onClick={this.cancelHandler}
                        >
                            <Icon>backspace</Icon>
                        </Button>
                    </li>
                    {this.canDelete() ?
                        <li>
                            <Button
                                aria-label="cancel"
                                variant="fab"
                                color="secondary"
                                mini="true"
                                tooltip="back to the future :)"
                                onClick={() => this.deletePostHandler()}
                            >
                                <Icon>delete_forever</Icon>
                            </Button>
                        </li>
                        : null
                    }
                </ul> */}
            </div>
        );
    }

    render() {
        return (
            <div className={classes.EditPost}>
                <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
                {this.getEditBtns()}
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex} >
                    <Tab label="Summary" value={0} />
                    <Tab label="Body" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}>
                    <div className={classes.TabContent}>
                        <div className={classes.TabInnerCol} style={styles.slide}>
                            <TextField
                                floatingLabelText="Title"
                                fullWidth hintText="A title for your post"
                                value={this.state.post.title}
                                onChange={(event) => this.setState({ post: { ...this.state.post, title: event.target.value } })}
                            /><br />
                            <TextField
                                floatingLabelText="Slug"
                                fullWidth hintText="a-nice-name-without-fantasy"
                                value={this.state.post.path}
                                onChange={(event) => this.setState({ post: { ...this.state.post, path: event.target.value } })}
                            /><br />
                            <TextField
                                floatingLabelText="Thumbnail image path"
                                fullWidth hintText="Path of a 320x240px thumbnail image"
                                value={this.state.post.thumb}
                                onChange={(event) => this.setState({ post: { ...this.state.post, thumb: event.target.value } })}
                            /><br />
                            <TextField
                                floatingLabelText="Hero image path"
                                fullWidth hintText="Path of a 800x200px hero image"
                                value={this.state.post.hero}
                                onChange={(event) => this.setState({ post: { ...this.state.post, hero: event.target.value } })}
                            /><br />
                            <TextField
                                floatingLabelText="Tags"
                                fullWidth hintText="For instance: news music program"
                                value={this.state.post.tags}
                                onChange={(event) => this.setState({ post: { ...this.state.post, tags: event.target.value } })}
                            /><br />
                            <TextField
                                floatingLabelText="Description"
                                fullWidth
                                hintText="A short desc of your post"
                                multiLine={true}
                                rows={4}
                                rowsMax={10}
                                value={this.state.post.desc}
                                onChange={(event) => this.setState({ post: { ...this.state.post, desc: event.target.value } })}
                            />
                        </div>
                        <div
                            className={classes.TabInnerCol}>
                            TODO: Show Pictures
                        </div>

                    </div>
                    <div style={styles.slide}>
                        <div className={classes.TabContent}>
                            <div className={classes.TabInnerCol}>
                                <Textarea
                                    rows={10}
                                    value={this.state.post.body}
                                    onChange={this.handleMarkdownChange}
                                />
                            </div>

                            <div className={[classes.Preview, classes.TabInnerCol].join(' ')}>
                                <Markdown
                                    className={classes.Result}
                                    source={this.state.post.body}
                                />
                            </div>
                        </div>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        userRoles: state.auth.userRoles,
    };
};

export default withErrorHandler(connect(mapStateToProps)(EditPost), axios);
