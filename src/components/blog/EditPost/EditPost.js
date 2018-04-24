import React, { Component } from 'react';

import { connect } from 'react-redux';
import axios from '../../../apiServer';

// Inputs from Material UI
import TextField from 'material-ui/TextField';

import classes from './EditPost.css';

class EditPost extends Component {
    state = {
        id: '',
        date: '',
        path: '',
        title: '',
        author: '',
        tags: '',
        desc: '',
        body: '',
        createdOn: '',
        lastUpdatedOn: '',
        lastUpdatedBy: ''
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
                axios.get('/posts/'+cId, options).then(response => {
                    console.log(response.data)
                    this.setState({ ...response.data.post });
                });
            }
        }
    }


    postDataHandler = () => {
        const data = {

            // Read only for the time being 
            id: this.state.id,
            // date: this.state.date,
            // author: this.state.author, //  === '' ? this.state.currUserMail : this.state.author,
            // createdOn: this.state.createdOn,

            // Edited by user
            title: this.state.title,
            path: this.state.path,
            tags: this.state.tags,
            desc: this.state.desc,

            // MD rendering
            body: this.state.body,

            // TODO rather inject here current user and date time
            // updatedOn: this.state.updatedOn,
            // updatedBy: this.state.updatedBy
        };

        // retrieve token from redux and pass it to axios
        var options = { headers: { 'Authorization': this.props.token } };

        console.log('### About to send post\n',data, options)

        axios.post('/posts', data, options).then(response => {
            console.log(response); // TODO Give feedback to the user 
            this.setState({ ...response.data.post });
        }).catch(err => {
            console.log(err); // TODO handle error?
        });
    }

    render() {
        return (
            <div className={classes.EditPost}>
                <h1>Add a Post</h1>
                <TextField hintText="A title for your post" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} /><br />
                <TextField hintText="A path for your post" value={this.state.path} onChange={(event) => this.setState({ path: event.target.value })} /><br />
                <TextField hintText="Some tags for your post" value={this.state.tags} onChange={(event) => this.setState({ tags: event.target.value })} /><br />
                <TextField hintText="A short desc of your post" value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} /><br />
                {/* <label>Title</label>
                <input type="text"  />

                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />

            */}
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currUserMail: state.auth.email
    };
};

export default connect(mapStateToProps)(EditPost);
