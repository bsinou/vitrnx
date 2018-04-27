import React, { Component } from 'react';
import apiServer from '../../../apiServer';

// Import the Markdown component
import Markdown from 'react-markdown';

// Material UI
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Own component
import PostInfo from '../PostInfo/PostInfo';
import Aux from '../../../hoc/Aux/Aux';


import classes from './Post.css';
const style = {
    marginRight: 14,
    marginTop: 10,
};

class Post extends Component {
    state = {
        loadedPost: null, 
        canEdit: true
    }

    componentDidMount() {
        console.log(this.props);
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
                    console.log(response.data)
                    this.setState({ loadedPost: response.data.post });
                });
            }
        }
    }

    newPostHandler = () => {
        this.props.history.push('/p/edit');
    };

    editPostHandler = (id) => {
        console.log('Edit #' + id);
        this.props.history.push('/p/edit/' + id);
    };

    deletePostHandler = (id) => {
        console.log('Delete #' + id);
    };

    getEditBtns = (id, canEdit) => {
        return (
            <div>{
                canEdit ?
                    <ul className={classes.SideButtons} >
                        <li key="add" >
                            <FloatingActionButton
                                onClick={this.newPostHandler}
                                mini={true}
                                secondary={true}
                                style={style}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </li>
                        <li key="edit" >
                            <FloatingActionButton
                                onClick={() => this.editPostHandler(id)}
                                mini={true}
                                style={style}>
                                <ContentEdit />
                            </FloatingActionButton>
                        </li>
                        <li key="delete" >
                            <FloatingActionButton
                                onClick={() => this.deletePostHandler(id)}
                                mini={true}
                                secondary={true}
                                style={style}>
                                <ContentDelete />
                            </FloatingActionButton>
                        </li>
                    </ul>
                    : null
            }</div>
        );
    }


    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <Aux>                        
                {this.getEditBtns(this.state.loadedPost.path, this.state.canEdit)}
                <div className={classes.Post}>
                    <Card>
                        <CardMedia overlay={<CardTitle title={this.state.loadedPost.title} />}>
                            <img src={"../imgRepo/" + this.state.loadedPost.hero} alt="" />
                        </CardMedia>
                    </Card>
                    <div className={classes.Desc}>{this.state.loadedPost.desc}</div>
                    <PostInfo tags={this.state.loadedPost.tags} date={this.state.loadedPost.date} author={this.state.loadedPost.author} />
                    <Markdown className={classes.Body} escapeHtml={true} source={this.state.loadedPost.body} />
                </div>
                </Aux>
            );
        }
        return post;
    }
}

export default Post;