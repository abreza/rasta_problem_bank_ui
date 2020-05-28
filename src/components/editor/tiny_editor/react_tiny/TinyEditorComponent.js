import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce/tinymce';

import config from '../config';

export default class TinyEditorComponent extends Component {
  constructor(params) {
    super(params);
    this.state = { editor: null };
    config.setup = (editor) => {
      this.setState({ editor });
      editor.on('keyup change', () => {
        const content = editor.getContent();
        this.props.onEditorChange(content);
      });
    };
  }

  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  render() {
    return <Editor init={config} onEditorChange={this.handleEditorChange} />;
  }
}
