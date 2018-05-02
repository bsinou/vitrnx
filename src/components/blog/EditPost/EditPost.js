import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../apiServer';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';

// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
// Material UI
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSave from 'material-ui/svg-icons/content/save';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import ActionDelete from 'material-ui/svg-icons/content/clear';


import classes from './EditPost.css';

const btnStyle = {
    marginRight: 14,
    marginTop: 10,
};


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

class EditPost extends Component {
    state = {
    }

    constructor(props) {
        super(props);

        this.handleMarkdownChange = this.handleMarkdownChange.bind(this)

        this.state = {
            id: '',
            path: '',
            date: '',
            title: '',
            author: '',
            tags: '',
            thumb: '',
            hero: '',
            desc: '',
            body: '',
            createdOn: '',
            lastUpdatedOn: '',
            lastUpdatedBy: '',

            canManage: false,

            slideIndex: 0,
            htmlMode: 'raw'
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    handleMarkdownChange(evt) {
        this.setState({ body: evt.target.value })
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
            if (!this.state.path || this.state.path !== currId) {
                var options = { headers: { 'Authorization': this.props.token } };
                axios
                    .get('/posts/' + currId, options)
                    .then(response => {
                        this.setState({ ...response.data.post, claims: response.data.claims  });
                    })
                    .catch(error => {
                        console.log('# could not load ' + currId, error)
                        this.setState({ path: currId });
                    });
            }
        }
    }

    postDataHandler = () => {
        const data = {
            // Edited by user
            id: this.state.id,
            path: this.state.path,
            title: this.state.title,
            tags: this.state.tags,
            desc: this.state.desc,
            thumb: this.state.thumb,
            hero: this.state.hero,
            // MD rendering 
            body: this.state.body,
        };

        // retrieve token from redux and pass it to axios
        var options = { headers: { 'Authorization': this.props.token } };
        axios.post('/posts', data, options).then(response => {
            console.log(response); // TODO Give feedback to the user, TODO also implement regular auto-save 
            this.setState({ ...response.data.post, claims: response.data.claims  });
        }).catch(err => {
            console.log(err); // TODO handle error?
        });
    }

    deletePostHandler = (path, id) => {
        if (window.confirm('Are you sure you want to completely remove this post?')) {
            if (!id || id === "") {// No ID <=> new post, simply forward to cancel
                this.cancelHandler()
            }
            var options = { headers: { 'Authorization': this.props.token } };
            axios.delete('/posts/' + path, options).then(response => {
                this.props.history.push('/q/news');
            });
        }

    };

    cancelHandler = () => {
        this.props.history.goBack();
    };

    getEditBtns = (path, id, canManage) => {
        return (
            <div>
                <ul className={classes.SideButtons} >
                    <li>
                        <FloatingActionButton
                            onClick={this.postDataHandler}
                            mini={true}
                            style={btnStyle}>
                            <ActionSave />
                        </FloatingActionButton>
                    </li>

                    {/* 
                        TODO : add tooltip
                        see: http://bluedesk.blogspot.de/2017/10/react-material-ui-fab-with-optional_18.html
                        or mui v1.00 => FAB have no tooltip before v1 (we're currently using v0.20) 
                    */}
                    <li>
                        <FloatingActionButton
                            onClick={this.cancelHandler}
                            mini={true}
                            secondary={true}
                            style={btnStyle}
                            tooltip="Say something" >
                            <ActionCancel />
                        </FloatingActionButton>

                    </li>
                    {canManage ?
                        <li>
                            <FloatingActionButton
                                onClick={() => this.deletePostHandler(id)}
                                mini={true}
                                secondary={true}
                                style={btnStyle}>
                                <ActionDelete />
                            </FloatingActionButton>
                        </li>
                        : null
                    }
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className={classes.EditPost}>
                {this.getEditBtns(this.state.path, this.state.id, (this.state.claims && this.state.claims.canManage==="true"))}
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
                                value={this.state.title}
                                onChange={(event) => this.setState({ title: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Slug"
                                fullWidth hintText="a-nice-name-without-fantasy"
                                value={this.state.path}
                                onChange={(event) => this.setState({ path: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Thumbnail image path"
                                fullWidth hintText="Path of a 400x300px thumbnail image"
                                value={this.state.thumb}
                                onChange={(event) => this.setState({ thumb: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Hero image path"
                                fullWidth hintText="Path of a 1200x300px hero image"
                                value={this.state.hero}
                                onChange={(event) => this.setState({ hero: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Tags"
                                fullWidth hintText="For instance: news music program"
                                value={this.state.tags}
                                onChange={(event) => this.setState({ tags: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Description"
                                fullWidth
                                hintText="A short desc of your post"
                                multiLine={true}
                                rows={4}
                                rowsMax={10}
                                value={this.state.desc}
                                onChange={(event) => this.setState({ desc: event.target.value })}
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
                                    value={this.state.body}
                                    onChange={this.handleMarkdownChange}
                                />
                            </div>

                            <div className={[classes.Preview, classes.TabInnerCol].join(' ')}>
                                <Markdown
                                    className={classes.Result}
                                    source={this.state.body}
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
        // currUserMail: state.auth.email
    };
};

export default withErrorHandler(connect(mapStateToProps)(EditPost), axios);
