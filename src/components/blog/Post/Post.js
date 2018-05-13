import React, { Component } from 'react';
import apiServer from '../../../apiServer';

// Import the Markdown component
import Markdown from 'react-markdown';

// Material UI
import { withStyles } from 'material-ui/styles';
import Card, { CardMedia, CardTitle } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

// Own component
import PostInfo from '../PostInfo/PostInfo';
import Comments from '../../comment/Comments';
import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper';


import customCss from './Post.css';
const style = {
    marginRight: 14,
    marginTop: 10,
};

const postStyles = theme => ({

    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Layout extends React.Component {
    render() {
        // console.log('et ici ',this.props.post);

        const { classes, post } = this.props;
        return (
            <div className={customCss.Post}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image={"/imgRepo/" + post.hero}
                        // overlay={<CardTitle>{post.title}</CardTitle>}
                    />
                    {/* <CardTitle>{post.title}</CardTitle> */}
                </Card>
                <div className={customCss.SubCard}>
                    <h1>{post.title}</h1>
                    <div className={customCss.Desc}>{post.desc}</div>
                    <PostInfo tags={post.tags} date={post.date} author={post.author} />
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

// PostLayout.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const PostLayout = withStyles(postStyles)(Layout);

class Post extends Component {
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
                apiServer.get('/posts/' + cId, options).then(response => {
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
            apiServer.delete('/posts/' + id, options).then(response => {
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
                                <Icon >add_circle</Icon>
                            </Button>
                        </li>
                        <li key="edit" >
                            <Button onClick={() => this.editPostHandler(id)}>
                                <Icon >edit_circle</Icon>
                            </Button>
                        </li>
                        {this.canDelete() ? (
                            <li key="delete" >
                                <Button onClick={() => this.deletePostHandler(id)} >
                                    <Icon >delete_circle</Icon>
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
            post = (
                <AuxWrapper>
                    {this.getEditBtns(this.state.loadedPost.path)}
                    <PostLayout post={this.state.loadedPost} />
                </AuxWrapper>
            );
        }
        return post;
    }
}

export default Post;