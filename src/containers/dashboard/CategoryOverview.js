import React from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../apiServer';

import EditButtons from './CatEditButtons';

import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';

import customClasses from './Dashboard.css';

class CatEditor extends React.Component {

    handleValueChange = name => event => {
        this.props.onValueChanged(event, name)
    }

    render() {
        const { post, isEditing } = this.props;
        return isEditing ? (
            <Textarea
                value={post.body}
                onChange={this.handleValueChange('body')}
            />) : (<Markdown
                className={customClasses.TabInnerCol}
                source={post.body}
            />);
    }
}

class EditPost extends React.Component {
    state = {
        htmlMode: 'raw',
        isEditing: false,
    }

    componentDidMount() {
        this.loadPost(false, false);
    }

    componentDidUpdate() {
        if (!this.state.isEditing){
            this.loadPost(false, false);
        }
    }

    loadPost(force, edit) {
        if (force || !this.state.post || this.state.post.path !== this.props.id) {
            var options = { headers: { 'Authorization': this.props.token } };
            axios
                .get('/posts/' + this.props.id, options)
                .then(response => {
                    this.setState({ post: { ...response.data.post }, isEditing: edit });
                })
                .catch(error => {
                    console.log('Could not load ' + this.props.id, error)
                    this.setState({ post: { ...this.state.post, path:this.props.id  }, isEditing: edit });
                });
        }
    }

    postDataHandler = (continueEditing) => {
        var data = { ...this.state.post }
        var options = { headers: { 'Authorization': this.props.token } };

        axios.post('/posts', data, options).then(response => {
            this.setState({ post: { ...response.data.post }, isEditing: continueEditing });
        }).catch(err => {
            console.log(err); // TODO handle error?
        });
    }


    cancelEditing = () => {
        this.loadPost(true, false);
    };

    startEditing = () => {
        this.setState({ isEditing: true });
    };

    onValueChange = (event, key) => {
        let updatedPost = { ...this.state.post };
        updatedPost[key] = event.target.value
        this.setState(
            { post: updatedPost }
        );
    };

    render() {
        return (!this.props.token || !this.state.post) ? null : (
            <div className={customClasses.TabInnerCol}>
                <EditButtons
                    isEditing={this.state.isEditing}
                    onSave={() => this.postDataHandler(true)}
                    onSaveAndQuit={() => this.postDataHandler(false)}
                    onCancel={this.cancelEditing}
                    onEdit={this.startEditing}
                />
                <CatEditor 
                    post={this.state.post}
                    onValueChanged={this.onValueChange}
                    isEditing={this.state.isEditing}
                />
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
}

export default withErrorHandler(connect(mapStateToProps)(EditPost), axios);
