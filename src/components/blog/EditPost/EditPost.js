import React from 'react';
import { connect } from 'react-redux';

import axios from '../../../apiServer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import EditButtons from '../../ui/EditButtons/EditButtons';
import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';

import PropTypes from 'prop-types';

// Material UI
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import customCss from './EditPost.css';

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


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles2 = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component {
    state = {
        tabIndex: 0,
    };

    handleChange = (event, tabIndex) => {
        this.setState({ tabIndex });
    };

    handleValueChange = name => event => {
        this.props.onValueChanged(event, name)
    }

    handleMdChange = name => event => {
        // console.log('Handle MD Change for ', name)
        this.props.onMarkdownChanged(event);
    }

    render() {
        const { classes, post } = this.props;
        const { tabIndex } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs tabIndex={tabIndex} onChange={this.handleChange}>
                        <Tab label="Overview & Meta-Data" />
                        <Tab label="Markdown body" />
                    </Tabs>
                </AppBar>
                {tabIndex === 0 && <TabContainer>

                    <div className={customCss.TabContent}>
                        <div className={customCss.TabInnerCol} style={styles.slide}>
                            <TextField
                                id="title"
                                helperText="A title for your post"
                                value={post.title}
                                onChange={this.handleValueChange('title')}
                                fullWidth />
                            <TextField
                                // label="Slug"
                                helperText="a-nice-name-without-fantasy"
                                value={post.path}
                                onChange={this.handleValueChange('path')}
                                fullWidth />
                            <TextField
                                // fullWidth
                                // label="Thumbnail image path"
                                helperText="Path of a 320x240px thumbnail image"
                                value={post.thumb}
                                // onChange={() => onValueChanged('thumb')}
                                onChange={this.handleValueChange('thumb')}
                                // onChange={(event) => this.setState({ post: { ...this.state.post, thumb: event.target.value } })}
                                fullWidth />
                            <TextField
                                // label="Hero image path"
                                helperText="Path of a 800x200px hero image"
                                value={post.hero}
                                // onChange={() => onValueChanged('hero')}
                                onChange={this.handleValueChange('hero')}
                                // onChange={(event) => this.setState({ post: { ...this.state.post, hero: event.target.value } })}
                                fullWidth />
                            <TextField
                                // label="Tags"
                                helperText="For instance: news music program"
                                value={post.tags}
                                onChange={this.handleValueChange('tags')}
                                // onChange={() => onValueChanged('tags')}
                                // onChange={(event) => this.setState({ post: { ...this.state.post, tags: event.target.value } })}
                                fullWidth />
                            <TextField
                                // label="Description"
                                fullWidth
                                helperText="A short desc of your post"
                                // multiLine={true}
                                rows={4}
                                rowsMax={10}
                                onChange={this.handleValueChange('desc')}
                                value={post.desc}
                            // onChange={() => onValueChanged('desc')}
                            // onChange={(event) => this.setState({ post: { ...this.state.post, desc: event.target.value } })}
                            />
                        </div>
                        <div
                            className={customCss.TabInnerCol}>
                            TODO: Show Pictures
                        </div>

                    </div>


                </TabContainer>}

                {tabIndex === 1 && <TabContainer>
                    <div className={customCss.TabContent}>
                        <div className={customCss.TabInnerCol}>
                            <Textarea
                                rows={10}
                                value={post.body}
                                onChange={this.handleMdChange('body')}
                            />
                        </div>

                        <div className={[customCss.Preview, customCss.TabInnerCol].join(' ')}>
                            <Markdown
                                className={customCss.Result}
                                source={post.body}
                            />
                        </div>
                    </div>
                </TabContainer>}
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const EditorTabs = withStyles(styles2)(SimpleTabs);


class EditPost extends React.Component {
    state = {
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
            if (!this.state.post || this.state.post.path !== currId) {
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

    handleChange = (tabIndex) => {
        this.setState({
            slideIndex: tabIndex,
        });
    };

    onValueChange = (event, key) => {
        let updatedPost = { ...this.state.post };
        updatedPost[key] = event.target.value
        this.setState(
            { post: updatedPost }
        );
    };


    handleMarkdownChange = (evt) => {
        this.setState({ post: { ...this.state.post, body: evt.target.value } })
    }

    render() {
        return !this.props.token || !this.state.post ? null : (
            <div className={customCss.EditPost}>
                <EditButtons
                    onSave={this.postDataHandler}
                    onCancel={this.cancelHandler}
                    onDelete={this.deletePostHandler} canDelete={this.canDelete} />
                <EditorTabs
                    post={this.state.post}
                    onValueChanged={this.onValueChange}
                    onMarkdownChanged={this.handleMarkdownChange} />
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
