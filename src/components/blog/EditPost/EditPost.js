import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../apiServer';

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
            path: '',
            date: '',
            title: '',
            author: '',
            tags: '',
            thumb:'',
            hero:'',
            desc: '',
            body: '',
            createdOn: '',
            lastUpdatedOn: '',
            lastUpdatedBy: '',

            canEdit: false,

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
                axios.get('/posts/' + currId, options).then(response => {
                    console.log(response.data)
                    this.setState({ ...response.data.post });
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
            this.setState({ ...response.data.post });
        }).catch(err => {
            console.log(err); // TODO handle error?
        });
    }

    cancelHandler() {
        // TODO
        console.log('Go back');
        // this.props.context.router.history.goBack();
    }

    getEditBtns = (id, canEdit) => {
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
                        FIXME: 
                            + cancel does not work (should go back one page) 
                            + Icon is not appropriated (look like delete)
                    <li>
                        <FloatingActionButton
                            onClick={this.cancelHandler}
                            mini={true}
                            secondary={true}
                            style={btnStyle}>
                            <ActionCancel />
                        </FloatingActionButton>
                    </li> */}
                    {canEdit ?
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
                {this.getEditBtns(this.state.path, this.state.canEdit)}
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
                                fullWidth hintText="Thumbnail image name"
                                value={this.state.thumb}
                                onChange={(event) => this.setState({ thumb: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Hero image path"
                                fullWidth hintText="Hero image name"
                                value={this.state.hero}
                                onChange={(event) => this.setState({ hero: event.target.value })}
                            /><br />
                            <TextField
                                floatingLabelText="Tags"
                                fullWidth hintText="Some tags for your post, for intance: News Music Program"
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

export default connect(mapStateToProps)(EditPost);
