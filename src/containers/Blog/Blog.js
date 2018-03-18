import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

// import axios from 'axios';

import Posts from '../../components/blog/Posts/Posts';
import FullPost from '../../components/blog/FullPost/FullPost';
// import NewPost from '../../components/blog/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    // state = {
    //     posts: [],
    //     selectedPostId: null,
    //     error: false
    // }

    // componentDidMount() {
    //     console.log('componentDidMount, url:' + this.props.match.params)

    //     axios.get('/posts')
    //         .then(response => {
    //             const posts = response.data.slice(0, 4);
    //             const updatedPosts = posts.map(
    //                 post => {
    //                     return {
    //                         ...post
    //                     }
    //                 }
    //             );
    //             this.setState({ posts: updatedPosts, error: false });
    //         }).catch(error => {
    //             this.setState({ error: true })
    //             console.log(error);
    //         });
    // }

    // postSelectedHandler = (id) => {
    //     this.props.history.push('/p/' + id);
    // };
    render() {
        return (
            <div>
                <Route path={'/p/:id'} exact component={FullPost} />
                <Route path={'/q/:id'} exact component={Posts} />
                {/* <Route path={'/p'} exact render={() => (<section>{posts}</section>)} /> */}
            </div>
        );
    }

    // render() {
    //     // if (this.state.selectedPostId) {
    //     //     return <Redirect push to={"/p/"+this.state.selectedPostId} />;
    //     // }

    //     let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
    //     if (!this.state.error) {
    //         posts = this.state.posts.map(
    //             post => {
    //                 return (
    //                     <Post
    //                         key={post.id}
    //                         title={post.title}
    //                         author={post.author}
    //                         desc={post.desc}
    //                         clicked={() => this.postSelectedHandler(post.id)}
    //                     />
    //                 );
    //             });
    //     }
    //     return (
    //         <div>
    //             <Route path={'/p/:id'} exact component={FullPost} />
    //             <Route path={'/p'} exact render={() => (<section>{posts}</section>)} />
    //         </div>
    //     );
    // }
}

export default Blog;