import React, { Component } from 'react';

import apiServer from '../../../apiServer';

import PostCard from '../PostCard/PostCard';
import Aux from '../../../hoc/Aux/Aux';


// Material UI
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import classes from './Posts.css';
import './Posts.css';


class Posts extends Component {

    state = {
        posts: [],
        loadedCategory: null,
        canEdit: false,
        error: false
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.props.token) { return; }

        if (this.props.match.params.id) {
            if (!this.state.loadedCategory || this.state.loadedCategory !== this.props.match.params.id) {

                var options = { headers: { 'Authorization': this.props.token } };
                var url = '/posts?tag=' + this.props.match.params.id;
                apiServer.get(url, options)
                    .then(response => {
                        const posts = response.data.posts.slice(0, 10);
                        const updatedPosts = posts.map(
                            post => { return { ...post }; }
                        );
                        this.setState({ posts: updatedPosts, canEdit: response.data.claims.canEdit, loadedCategory: this.props.match.params.id });
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
        console.log(this.props.history);
        this.props.history.push('/p/edit');
    };


    getAddBtn = (canEdit) => {
        let btns = null;
        if (canEdit === "true") {
            btns = (
                <div>
                    <ul className={classes.SideButtons} >
                        <li>
                            <FloatingActionButton
                                onClick={this.newPostHandler}
                                mini={true}
                                secondary={true}
                                style={{ marginRight: 14, marginTop: 10 }}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </li>
                    </ul>
                </div>
            );
        }
        return btns;
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong: could not load post list...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (  // TODO rather directly pass the object than the props one by one
                        <PostCard
                            className={classes.PostCard}
                            key={post.path}
                            path={post.path}
                            title={post.title}
                            tags={post.tags}
                            author={post.author}
                            desc={post.desc}
                            date={post.date}
                            currId={this.state.loadedCategory ? this.state.loadedCategory : 'all'}
                            // thumb={post.thumb}
                            thumb={"../imgRepo/" + post.thumb}
                            clicked={() => this.postSelectedHandler(post.path)}
                        />
                    );
                });
        }
        return (
            // <Aux>
            <Aux>
                {this.getAddBtn(this.state.canEdit)}
                <div className={classes.Posts}>
                    {posts}
                </div>
            </Aux>
        );
        //    {/* </Aux> */ }
        //     {/* <Aux>
        //             {this.getAddBtn(this.state.canEdit)}
        //             <div className={classes.TableDisplay}>
        //                 <div className={classes.LeftCol}>
        //                     {posts[0]}
        //                 </div>
        //                 {posts.length > 2 ? (
        //                 <div className={classes.RightCol}>
        //                     {posts[1]}
        //                     {posts[2]}
        //                 </div>) : null}
        //             </div>
        //             {posts.length > 3 ? (
        //                     <section>{posts.slice(3)}</section>
        //                 ) : null}
        //         </Aux> */}

    }
}

export default Posts;