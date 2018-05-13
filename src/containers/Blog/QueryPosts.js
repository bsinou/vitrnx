import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiServer from '../../apiServer';

// Material UI
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/colors';

class QueryPosts extends Component {

    state = {
        posts: [],
        query: null,
        error: false,
        showAll: true,
        loaded: false,

    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

        if (!this.state.loaded && (this.state.showAll || this.state.query) ) {

            var options = { headers: { 'Authorization': this.props.token } };
            var url = this.state.query ? '/posts?query=' + this.state.query : '/posts';
            apiServer.get(url, options)
                .then(response => {
                    const posts = response.data.posts;
                    const updatedPosts = posts.map(
                        post => { return { ...post }; }
                    );
                    this.setState({ posts: updatedPosts, loaded: true });
                }).catch(error => {
                    console.log(error);
                    this.setState({ error: true, loaded: true  })
                });
        }
    }

    postSelectedHandler = (event, path) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.history.push('/p/' + path);
    };

    // TODO add new post component

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong: could not load post list...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <div key={post.path}>
                            <ListItem
                                style={{ textAlign: 'left' }}
                                leftAvatar={<Avatar src={"../imgRepo/" + post.thumb} />}
                                primaryText={post.title}
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>{post.author}, {post.tags} - </span>
                                        {post.desc}
                                    </p>
                                }
                                secondaryTextLines={2}
                                onClick={(event) => this.postSelectedHandler(event, post.path)}
                            />
                            <Divider inset={true} />
                        </div>);
                });
        }

        return (
            <List>
                {posts}
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(QueryPosts);
