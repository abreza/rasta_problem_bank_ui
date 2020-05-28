import React, { Component } from 'react';
import tinymce from 'tinymce';

import 'tinymce/skins/ui/oxide/skin.min.css';

import config from '../config';

export default class TinyEditorComponent extends Component {
  constructor(params) {
    super(params);
    this.state = { editor: null };
    config.selector = '#' + params.id;
    config.setup = (editor) => {
      this.setState({ editor });
      editor.on('keyup change', () => {
        const content = editor.getContent();
        this.props.onEditorChange(content);
      });
    };
  }

  componentDidMount() {
    tinymce.init(config);
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        value={this.props.content}
        onChange={(e) => console.log(e)}
      />
    );
  }
}
