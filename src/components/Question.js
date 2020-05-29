import React, { Component } from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';
import Editor from './editor/moratab/MoratabEditorComponent';

import '../styles/Question.css';

export default class Question extends Component {
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
              {/* <Editor
                id="AnswerTextArea"
                onEditorChange={(content) => console.log(content)}
              /> */}
            </label>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}
