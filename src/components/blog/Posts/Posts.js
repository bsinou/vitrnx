import React, { Component } from 'react';

import apiServer from '../../../apiServer';

import PostCard from '../PostCard/PostCard';
import Aux from '../../../hoc/Aux/Aux';


// Material UI
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import classes from './Posts.css';
import './Posts.css';
const style = {
    marginRight: 14,
    marginTop: 10,
};

class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        canEdit: true,
        error: false
    }

    componentDidMount() {
        console.log('In Posts.componentDidMount(), props: ', this.props);
        // console.log('In Posts.componentDidMount(), route token: ', this.props.route.token);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

        if (this.props.match.params.id) {
            if (!this.state.loadedCategory || this.state.loadedCategory !== this.props.match.params.id) {
              
                // retrieve token from redux and pass it to axios
                var options = { headers: { 'Authorization': this.props.token } };
                var url = '/posts?tag=' + this.props.match.params.id;
                console.log('### About to call: '+url);
      
                apiServer.get(url, options)
                    // apiServer.post('/posts/')
                    .then(response => {
                        const posts = response.data.slice(0, 10);
                        const updatedPosts = posts.map(
                            post => { return { ...post }; }
                        );
                        console.log('### Retrieved '+updatedPosts.length+' posts.');
                        this.setState({ posts: updatedPosts, error: false, loadedCategory: this.props.match.params.id });
                    }).catch(error => {
                        console.log(error);
                        this.setState({ error: true, loadedCategory: this.props.match.params.id })
                    });
            }
        }
    }

    postSelectedHandler = (path) => {
        this.props.history.push('/p/' + path);
    };

    newPostHandler = () => {
        this.props.history.push('/p/edit');
    };


    getAddBtn = (canEdit) => {
        return (
            <div>{
                canEdit ?
                    <ul className={classes.SideButtons} >
                        <li>
                            <FloatingActionButton
                                onClick={this.newPostHandler}
                                mini={true}
                                secondary={true}
                                style={style}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </li>
                    </ul>
                    : null
            }</div>
        );
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (  // TODO rather directly pass the object than the props one by one
                        <PostCard
                            key={post.path}
                            path={post.path}
                            title={post.title}
                            tags={post.tags}
                            author={post.author}
                            desc={post.desc}
                            date={post.date}
                            // thumb={post.thumb}
                            thumb={"../imgRepo/" + post.thumb}
                            clicked={() => this.postSelectedHandler(post.path)}
                        />
                    );
                });
        }
        return (
            <Aux>
                {this.getAddBtn(this.state.canEdit)}
                <div className={classes.Posts}>
                    <section>{posts}</section>
                </div>
            </Aux>
        );
    }
}

export default Posts;