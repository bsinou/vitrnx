import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiServer from '../../apiServer';

import Comment from './Comment'

import TextField from 'material-ui/TextField';

class Comments extends Component {

    state = {
        comments: [],
        postId: '',
        error: false,

        newCommentBody: ''
    }

    componentDidMount() {
        this.loadData(false);
    }

    componentDidUpdate() {
        this.loadData(false);
    }

    loadData(force) {
        if (!this.props.token) { return; }

        if (this.props.postId) {
            if (force || !this.state.postId || this.state.postId !== this.props.postId) {

                var options = { headers: { 'Authorization': this.props.token } };
                var url = '/posts/'+ this.props.postId+'/comments' ;
                apiServer.get(url, options)
                    .then(response => {
                        const currComments = response.data.comments;
                        const updatedComments = currComments.map(
                            comment => { return { ...comment }; }
                        );
                        this.setState({ comments: updatedComments, postId: this.props.postId, error: false });
                    }).catch(error => {
                        console.log(error);
                        this.setState({ error: true, postId: this.props.postId })
                    });
            }
        }
    }

    newCommentHandler = (event) => {
        const data = {
            parentId: this.state.postId,
            body: this.state.newCommentBody,
        };
        const options = { headers: { 'Authorization': this.props.token } };
        apiServer.post('/comments', data, options)
            .then(response => {
                this.setState({ newCommentBody: ''});
                this.loadData(true);
            }).catch(error => {
                console.log(error);
                this.setState({ error: true });
            });
    };


    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            this.newCommentHandler(event)
        }
    }


    handleBodyChange = (e) => {
        this.setState({
            newCommentBody: e.target.value
        });
    }

    render() {
        let comments = <p style={{ textAlign: 'center' }}>Something went wrong: could not load comment list...</p>
        if (!this.state.error) {
            comments = this.state.comments.map(
                comment => {
                    return (  
                        <Comment
                            key={comment.id}
                            onCommentChange={() => this.loadData(true)}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                            comment={comment}
                        />
                    );
                });
        }

        return (
            <div>
                <h1>Comments</h1>
                <div>
                    <TextField
                        fullWidth
                        helperText="Add a comment..."
                        rows={2}
                        rowsMax={4}
                        value={this.state.newCommentBody}
                        onChange={this.handleBodyChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
                <div>
                    {comments}
                </div>
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

export default connect(mapStateToProps)(Comments);
