import React, { Component } from 'react';
import apiServer from '../../../apiServer';

import classes from  './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: ''
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
        };

        apiServer.post('/posts', data).then(response => {
            console.log(response)
        });
    }

    render() {
        return (
            <div className={classes.NewPost}>
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Marie-Madeleine">Marie-Madeleine</option>
                    <option value="Bruno">Bruno</option>
                    <option value="Pierre">Pierre</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;