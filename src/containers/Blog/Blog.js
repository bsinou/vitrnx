import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import axios from '../../apiServer';

import Posts from '../../components/blog/Posts/Posts';
import Post from '../../components/blog/Post/Post';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import classes from './Blog.css';

const style = {
    marginRight: 14,
    marginTop: 10,
};


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

    newPostHandler = () => {
        console.log('Here')
        this.props.history.push('/p/new');
    };

    render() {
        // TODO implement admin only addition 
        let canAdd = true;

        let newBtn = (
            <div>
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
                    <li>
                        <FloatingActionButton
                            onClick={this.newPostHandler}
                            mini={true}
                            style={style}>
                            <ContentEdit />
                        </FloatingActionButton>
                    </li>
                    <li>
                        <FloatingActionButton
                            onClick={this.newPostHandler}
                            mini={true}
                            secondary={true}
                            style={style}>
                            <ContentDelete />
                        </FloatingActionButton>
                    </li>
                </ul>
            </div>
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
