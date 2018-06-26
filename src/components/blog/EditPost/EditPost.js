import React from 'react';
import { connect } from 'react-redux';

import axios from '../../../apiServer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import EditButtons from '../../ui/EditButtons/EditButtons';
import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';

import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Input, InputLabel, Tab, Tabs, TextField, Typography } from '@material-ui/core';

import customCss from './EditPost.css';

// const styles = {
//     headline: {
//         fontSize: 24,
//         paddingTop: 16,
//         marginBottom: 12,
//         fontWeight: 400,
//     },
// };

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const gridStyle = {
    grid: {
      padding: "10px 15px !important"
    }
  };
  
  function CustGridItem({ ...props }) {
    const { classes, children, ...rest } = props;
    return (
      <Grid item {...rest} className={classes.grid}>
        {children}
      </Grid>
    );
  }
  
const GridItem = withStyles(gridStyle)(CustGridItem);
  


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
                        <div className={[customCss.TabInnerCol, customCss.Meta].join(' ')}>
                            <Grid container >
                                <GridItem xs={12} sm={12} md={12}>
                                    <TextField
                                        className={customCss.MetaField}
                                        id="title"
                                        label="A title for your post"
                                        // helperText="A title for your post"
                                        value={post.title}
                                        onChange={this.handleValueChange('title')}
                                        fullWidth />
                                </GridItem>
                            </Grid>
                            <Grid container >
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Slug (path-to-post)"
                                        // label="a-path-to-your-post"
                                        // helperText="a-nice-name-without-fantasy"
                                        helperText=""
                                        value={post.path}
                                        onChange={this.handleValueChange('path')}
                                        fullWidth />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                        //label="Tags"
                                        label="Tags: News, FAQ..."
                                        // helperText="For instance: News or FAQ"
                                        helperText=""
                                        value={post.tags}
                                        onChange={this.handleValueChange('tags')}
                                        // onChange={() => onValueChanged('tags')}
                                        // onChange={(event) => this.setState({ post: { ...this.state.post, tags: event.target.value } })}
                                        fullWidth />
                                </GridItem>
                            </Grid>
                            <Grid container >
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                        // fullWidth
                                         label="Thumbnail image (320x240px)"
                                        // label="Path of a 320x240px thumbnail image"
                                        // helperText="Path of a  thumbnail image"
                                        value={post.thumb}
                                        onChange={this.handleValueChange('thumb')}
                                        fullWidth />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                         label="Hero image (800x200px)"
                                        // label="Path to a 800x200px hero image"
                                        // helperText="Path to a 800x200px hero image"
                                        value={post.hero}
                                        onChange={this.handleValueChange('hero')}
                                        fullWidth />
                                </GridItem>
                            </Grid>
                            <Grid container>
                                
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#888888", margin:'1em 0em 0em 0em' }}>
                                        Description
                                    </InputLabel>
                                </GridItem>
                                <Grid xs={12} sm={12} md={12} >
                                    <Input
                                        style={{ width: '100%' }}
                                        // autoFocus
                                        multiline
                                        // fullwidth
                                        label="A short desc of your post"
                                        value={post.desc}
                                        onChange={this.handleValueChange('desc')}
                                        margin="normal"
                                        border="block"
                                    />
                                </Grid>
                            </Grid>

                        </div>
                        {/* <div
                            className={customCss.TabInnerCol}>
                            TODO: Show Pictures
                        </div> */}

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

const EditorTabs = withStyles(styles)(SimpleTabs);


class EditPost extends React.Component {
    state = {
        // Tab and MD editor management
        slideIndex: 0,
        htmlMode: 'raw',

        open: false,

        // dirty hack to avoid infinite looping
        isNew: true
    }

    componentDidMount() {
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
        } else {
            // force initialisation of new post
            this.setState({ post: {} });
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
        return (!this.props.token || !this.state.post) ? null : (
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
