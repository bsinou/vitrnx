import React from 'react';
import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';
// import TextField from 'material-ui/TextField';

import classes from './MdEditor.css'

class MdEditor extends React.PureComponent {
  state = {
    markdownSrc: ''
  }

  constructor(props) {
    super(props)

    this.handleControlsChange = this.handleControlsChange.bind(this)
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.state = {
      markdownSrc: props.body,
      htmlMode: 'raw'
    }
  }

  handleMarkdownChange(evt) {
    this.props.changed(evt)
    this.setState({ markdownSrc: evt.target.value })
  }

  handleControlsChange(mode) {
    this.setState({ htmlMode: mode })
  }

  render() {
    return (
      <div className={classes.MdEditor}>
        <div className={classes.Editor}>
          <Textarea
            rows={10}
            value={this.state.markdownSrc}
            onChange={this.handleMarkdownChange}
          />
        </div>

        <div className={classes.Preview}>
          <Markdown
            className={classes.Result}
            source={this.state.markdownSrc}
          />
        </div>
      </div>
    )
  }
}

export default MdEditor;