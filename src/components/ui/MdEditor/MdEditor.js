import React from 'react';
import Markdown from 'react-markdown';
import Textarea from 'react-expanding-textarea';
// import TextField from 'material-ui/TextField';

import classes from './MdEditor'

const initialSource = `
# Live demo
Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
## HTML block below
<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>
## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`
Pretty neat, eh?
## Tables?
| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |
## More info?
Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)
---------------
A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`

class Demo extends React.PureComponent {
  state = {
    markdownSrc: `# Live demo
    Changes are automatically rendered as you type.
    * Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
    * Renders actual, "native" React DOM elements
    * Allows you to escape or skip HTML (try toggling the checkboxes above)
    * If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
    ## HTML block below
    `
  }



  constructor(props) {
    super(props)

    this.handleControlsChange = this.handleControlsChange.bind(this)
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.state = {
      markdownSrc: initialSource,
      htmlMode: 'raw'
    }
  }

  handleMarkdownChange(evt) {
    this.setState({ markdownSrc: evt.target.value })
  }

  handleControlsChange(mode) {
    this.setState({ htmlMode: mode })
  }

  render() {
    return (
      <div className="classes.MdEditor">
        <div className="classes.Editor">
          <Textarea
            hintText="A short desc of your post"
            multiLine={true}
            rows={10}
            value={this.state.markdownSrc}
            onChange={this.handleMarkdownChange}
          />
        </div>

        <div className="classes.Preview">
          <Markdown
            className="result"
            source={this.state.markdownSrc}
          />
        </div>
      </div>
    )
  }
}

// if (typeof window !== 'undefined') {
//   ReactDOM.render(<Demo />, document.getElementById('main'))
// }

export default Demo;