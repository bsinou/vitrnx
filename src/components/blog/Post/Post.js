import React from 'react';
import axios from '../../../apiServer';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { Redirect} from 'react-router-dom';

// Own component
import PostInfo from '../PostInfo/PostInfo';
import Comments from '../../comment/Comments';
import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper';

import Markdown from 'react-markdown';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import {Button , Card,  CardMedia, Divider, Icon } from '@material-ui/core';

import customCss from './Post.css';
// import MediaPage from '../Media/MediaPage';

const postStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: '200px',
        paddingTop: '2%', // WTF
    },
});

class Layout extends React.Component {
    render() {
        const { classes, post } = this.props;
        return (
            <div className={customCss.Post}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image={"/imgRepo/" + post.hero}
                    // overlay={<CardTitle>{post.title}</CardTitle>}
                    />
                    {/* <CardTitle>{post.title}</CardTitle>  */}
                </Card>
                <div className={customCss.SubCard}>
                    <h1>{post.title}</h1>
                    <PostInfo tags={post.tags} date={post.date} author={post.author} />
                    <div className={customCss.Desc}>{post.desc}</div>
                    <Markdown className={customCss.Body} escapeHtml={true} source={post.body} />
                </div>
                <Divider />
                <div className={customCss.SubCard}>
                    <Comments postId={post.path} />
                </div>
            </div>
        );
    }
}

const PostLayout = withStyles(postStyles)(Layout);

class Post extends React.Component {
    state = {
        loadedPost: null,
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        const cId = this.props.match.params.id;
        if (cId) {
            if (!this.state.loadedPost || this.state.loadedPost.path !== cId) {
                var options = { headers: { 'Authorization': this.props.token } };
                axios.get('/posts/' + cId, options).then(response => {
                    this.setState({ loadedPost: response.data.post });
                });
            }
        }
    }

    newPostHandler = () => {
        this.props.history.push('/p/edit');
    };

    editPostHandler = (id) => {
        this.props.history.push('/p/edit/' + id);
    };

    deletePostHandler = (id) => {
        if (window.confirm('Are you sure you want to completely remove this post?')) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios.delete('/posts/' + id, options).then(response => {
                this.props.history.goBack();
            });
        }
    };

    canEdit = () => {
        return this.props.userRoles.includes("EDITOR") || this.props.userRoles.includes("MODERATOR");
    }

    canDelete = () => {
        return this.props.userRoles.includes("MODERATOR") || this.props.userId === this.state.loadedPost.authorId;
    }

    getEditBtns = (id) => {
        let btns = null;
        if (this.canEdit()) {
            btns = (
                // TODO simplify and factorize this
                <div>
                    <ul className={customCss.SideButtons} >
                        <li key="add" >
                            <Button onClick={this.newPostHandler}>
                                <Icon color="primary">add_circle</Icon>
                            </Button>
                        </li>
                        <li key="edit" >
                            <Button onClick={() => this.editPostHandler(id)}>
                                <Icon color="primary">edit_circle</Icon>
                            </Button>
                        </li>
                        {this.canDelete() ? (
                            <li key="delete" >
                                <Button onClick={() => this.deletePostHandler(id)} >
                                    <Icon color="secondary">delete_circle</Icon>
                                </Button>
                            </li>
                        ) : null}
                    </ul>
                </div>
            );
        }
        return btns;
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            if (this.state.loadedPost.tags.indexOf("Video") !== -1) {
                
                // TODO transmit correct adress via navigate to
                post = <Redirect to={"/v/"+this.props.match.params.id} />;
            } else { 
                post = (
                    <AuxWrapper>
                        {this.getEditBtns(this.state.loadedPost.path)}
                        <PostLayout post={this.state.loadedPost} />
                    </AuxWrapper>
                );
    
            }
        }
        return post;
    }
}

export default withErrorHandler(Post, axios);