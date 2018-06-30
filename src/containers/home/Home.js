
import React from 'react';
import { connect } from 'react-redux';
import axios from '../../apiServer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Comment from '../../components/comment/Comment';
import HomeTiles from './HomeTiles';

import { Grid } from '@material-ui/core';

import classes from './Home.css'

const radioTile = {
    path: '/play-the-game',
    type: 'soundPlayer',
    thumb: 'test.jpg',
    // title: 'TODO remove',
    author: 'Myself'
}

const comingTile = {
    path: '/you-better-click-and-fill',
    type: 'comingForm',
    thumb: 'test.jpg',
    title: 'U tell when U come => UR the best!',
    author: 'The wonderful orga team a.k.a CLIQUE ICI POUR T\'INSCRIRE :) '
}

const AddressPanel = (props) => {
    const componentClasses = [classes.Address];
    if (props.show) { componentClasses.push(classes.Show); }

    return (
        <div className={componentClasses.join(' ')}>{props.address}</div>
    );
};
class Home extends React.Component {

    state = {
        // homePost: null,
        // lastNews1: null,
        // lastNews2: null,
        // lastNews3: null,
        // lastVideo1: null,
        // lastVideo2: null,
        // lastTeaser: null,
        // lastBand: null,
        posts: [
            radioTile,
            // Make this optionnal
            comingTile
        ],
        comments: [],
        addresses: [],
        currAddIndex: 0,
        currAddShow: false,
    }


    loadPost(id, url, force, multi) {
        if (!this.props.token) { return; }

        if (!this.state[id] || force) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios.get(url, options)
                .then(response => {
                    // console.log('Got a post, about to set', response)
                    // if (id === "homePost") {
                    //     this.setState({ homePost: response.data.post });
                    // } else
                    this.setState((prevState, props) => {
                        let updatedArr = [...prevState.posts];
                        let nps = response.data.posts;

                        // Sanity check
                        if (multi){
                            if (!nps||nps.length===0) return;
                        } else if (!response.data.post) return;
                        
                        switch (id) {
                            case "lastNews":
                                updatedArr.splice(0, 0, nps[0]);
                                updatedArr.splice(4, 0, nps[1], nps[2]);
                                updatedArr.push(nps[3], nps[4], nps[5], nps[6]);
                                break;
                            case "lastTeaser":
                                updatedArr.splice(3, 0, response.data.post);
                                break;
                            case "lastVideo":
                            case "lastBand":
                                updatedArr.splice(3, 0, nps[0]);
                                updatedArr.push(nps[1]);
                                break;
                            case "lastFaqs":
                            updatedArr.splice(2, 0, nps[0]);
                            updatedArr.push(nps[1]);
                            break;
                            default:
                            // Do nothing
                        }
                        return { posts: updatedArr };
                    }
                    )
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    loadComments(force) {
        if (!this.props.token) { return; }
        if (force || this.state.comments.length === 0) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = '/comments';
            axios.get(url, options)
                .then(response => {
                    const cs = response.data.comments.slice(0, 48);
                    this.setState({ comments: cs });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    loadDreamAddresses(force) {
        if (!this.props.token) { return; }
        if (force || this.state.addresses.length === 0) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = '/dreamAddresses';
            axios.get(url, options)
                .then(response => {
                    let cs = [];
                    let j = 0;
                    for (let i = 0; i < response.data.addresses.length; i++) {
                        let currAd = response.data.addresses[i];
                        if (currAd.length > 0) {
                            cs[j] = currAd;
                            j++;
                        }
                    }
                    let startIndex = Date.now() % cs.length;
                    this.setState({ addresses: cs, currAddIndex: startIndex });
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    // Manage Routing here
    postSelectedHandler = (post) => {
        let path;
        if (post.type === "soundPlayer") { // Do nothing
            return;
        } else if (post.type === "comingForm") {// If open coming dialog 
            // Call redux and returns
            this.props.onOpenComingDialog();
            return;
        }

        // if playlist
        if (post.type === "radio") {
            // Whatever maybe do something....
            // or not
            return;
        }

        // Video
        if (post.tags.indexOf("Video") !== -1) {
            path = '/v/' + post.path;
        } else { // Default: post
            path = '/p/' + post.path;
        }
        this.props.history.push(path);
    };

    postSelectedFromComment = (path) => {
        this.props.history.push('/p/' + path);
    };


    refreshContent(force) {
        // this.loadPost("static", "/posts/home", force);
        this.loadPost("lastNews", "/posts?tag=News", force, true);
        this.loadPost("lastVideo", "/posts?tag=Video", force, true);
        this.loadPost("lastTeaser", "/posts/dibu", force);
        this.loadPost("lastBand", "/posts?tag=Band", force, true);
        this.loadPost("lastFaqs", "/posts?tag=FAQ", force, true);
        this.loadComments(force);
        this.loadDreamAddresses(force);
    }

    tick() {
        this.setState((prevState, props) => {
            if (prevState.currAddShow) {
                return ({
                    currAddShow: false,
                });
            } else {
                return ({
                    currAddShow: true,
                    currAddIndex: (prevState.currAddIndex + 1) % prevState.addresses.length
                });
            }
        });
    }

    componentDidMount() {
        this.refreshContent(false);
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {

        const { 
            posts,
            comments,
            addresses,
            currAddIndex,
            currAddShow
        } = this.state;

        let commentArr = [];

        if (comments) {
            commentArr = comments.map(
                comment => {
                    return (
                        <div onClick={() => { this.postSelectedFromComment(comment.parentId) }}>
                            <Comment
                                style={{}}
                                key={comment.id}
                                onCommentChange={() => this.loadData(true)}
                                token={this.props.token}
                                userId={this.props.userId}
                                userRoles={this.props.userRoles}
                                comment={comment}
                            />
                        </div>
                    );
                });
        }

        let page = (
            <Grid container justify="center" style={{ direction: 'row' }}>
                <Grid item className={classes.Paper} sm={12} md={8} lg={8}  >
                    <Grid item sm={12}>
                        <Grid container justify="center" className={classes.Paper} style={{ direction: 'row' }} >
                            <HomeTiles
                                    postSelected={this.postSelectedHandler}
                                    posts={posts}
                                />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.Paper} sm={12} md={3} lg={3} style={{}}>
                    {addresses.length === 0 ? null : (
                        <div className={classes.AddressBox}>
                            <div><i>You come to Montchenu, super. But what is your dream address?!?</i></div>
                            <AddressPanel show={currAddShow} address={addresses[currAddIndex]} />
                        </div>
                    )}
                    <div style={{ marginLeft: '.5em' }}>
                        <h4>Pendant ce temps là...</h4>
                    </div>
                    <div>{commentArr.length > 0 ? commentArr : null}</div>
                </Grid>
            </Grid>
        );
        return page
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        userRoles: state.auth.userRoles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenComingDialog: () => dispatch(actions.openComingDialog()),
    };
};


export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Home), axios);



// STOCK 

/* <Grid item className={classes.Paper} sm={12} style={{}}>
                        {!homePost ? null : (
                            <div>
                                <h1>{homePost.title}</h1>
                                <Markdown className={classes.Body} escapeHtml={true} source={homePost.body} />
                            </div>
                        )}
                    </Grid> */
