import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import axios from '../../apiServer';

import Posts from '../../components/blog/Posts/Posts';
import Post from '../../components/blog/Post/Post';

import './Blog.css';


class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        console.log('componentDidMount, url:' + this.props.match.params)
        // retrieve token from redux and pass it to axios
        var options = { headers: { 'Authorization': this.props.token } };

        axios.get('/posts', options).then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(
                post => {
                    console.log('Mapping post...')
                    console.log(post.path)
                    return {
                        ...post
                    }
                }
            );
            this.setState({ posts: updatedPosts, error: false });
        }).catch(error => {
            this.setState({ error: true })
            console.log(error);
        });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/p/' + id);
    };

    render() {
        // TODO implement admin only addition 
        let canAdd = true;

        let newBtn = (
            <NavLink to="/p/new" className="TextLink">
                Create a new post
            </NavLink>
        );

        return (
            <div>
                {canAdd ? newBtn : null}

                <Route path={'/p/:id'} exact component={(props) => (
                    <Post  {...props} token={this.props.token} />
                )} />
                <Route path={'/q/:id'} exact render={(props) => (
                    <Posts  {...props} token={this.props.token} />
                )} />

                {/* TODO: remove below line*/}
                <Route path={'/q'} component={Posts} />

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


const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Blog);
