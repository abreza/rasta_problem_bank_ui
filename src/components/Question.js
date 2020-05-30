import React, { Component } from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';
import Editor from './editor/tiny_editor/react_tiny/TinyEditorComponent';

import Selector from './selector/Selector';

import '../styles/Question.css';

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      sources:[
        {name: 'المپیاد ملی روسیه ۲۰۱۹'},
        {name: 'المپیاد ملی روسیه ۲۰۱۰'},
        {name: 'المپیاد ملی رومانی ۲۰۱۹'},
      ],

      events:[
        {name: 'عباس‌آباد'},
        {name: 'بوشهر'},
        {name: 'سراوان'},
        {name: 'کابار'},
      ]
    }
  }
  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={15} tablet={13} computer={12}>
          <Grid.Row centered>
            <Header as="h1" textAlign="center">
              مسئله جدید
            </Header>
          </Grid.Row>
          <Grid.Row style={{ textAlign: 'right', direction: 'rtl' }}>
            <Input placeholder="نام مسئله" className="rtl" />
            <Input
              placeholder="سختی"
              type="number"
              max="10"
              min="0"
              className="rtl hardness"
            />
          </Grid.Row>
          <Grid.Row>
            <label className="form-label">
              صورت مسئله
              <Editor
                id="QuestionTextArea"
                onEditorChange={(content) => console.log(content)}
              />
            </label>
          </Grid.Row>
          <Grid.Row>
            <label className="form-label">
              پاسخ
              <Editor
                id="AnswerTextArea"
                onEditorChange={(content) => console.log(content)}
              />
            </label>
          </Grid.Row>
          <Grid.Row>
            <Selector items={this.state.sources} placeholder='منبع' add_new />
            <Selector items={this.state.events} placeholder='رویداد' multiple />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}
