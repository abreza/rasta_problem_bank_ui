/* eslint-disable no-undef */
import React, { Component } from 'react';

import {
  Grid,
  Header,
  Icon,
  Container,
  Segment,
  Divider,
  Label,
} from 'semantic-ui-react';

import sampleQuestion from './sampleQuestion';
import Difficulty from '../components/question/Difficulty';
import Tag from '../components/question/Tag';
import { connect } from 'react-redux';

import TinyPreview from '../components/editor/tiny_editor/react_tiny/Preview';

class QuestionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: sampleQuestion, // temporary
      questionURL: 'https://bank.rastaiha.ir/problemset/problem/',
      tags: sampleQuestion.tags.map((tagName, i) => (
        <Tag key={tagName} name={tagName}></Tag>
      )),
      subtags: sampleQuestion.subtags.map((tagName, i) => (
        <Tag key={tagName} name={tagName}></Tag>
      )),
    };
  }

  render() {
    return (
      <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
        <Grid.Row centered relaxed>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              {'«' + this.state.question.name + '»'}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column
            width={11}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment textAlign="center">
              <Label size="large" attached="top">
                <Icon name="pencil" size="large" />
                {' صورت مسئله'}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20 }}>
                <br />
                <TinyPreview
                  frameProps={{
                    frameBorder: '0',
                    scrolling: 'no',
                    width: '100%',
                  }}
                  content="<p>سلام</p><p style='text-align: center'><span class='tiny-math'data-latex='\sum_{w \rightarrow 5}' ></span></p>"
                />
                {/* {this.state.question.questionText} */}
              </Container>
            </Segment>

            <Segment textAlign="center">
              <Label size="large" attached="top">
                <Icon name="book" size="large" />
                {' پاسخ'}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20 }}>
                <br />
                {/* {this.state.question.answer.answer} */}
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment textAlign="center">
              <Header content={'شناسنامه'} as="h2" textAlign="center" />
              <Divider section></Divider>
              {/* <Difficulty
                difficulty={this.props.question.difficulty}
              ></Difficulty> */}
              <Segment>
                <Label attached="top">مباحث کلی سوال</Label>
                {this.state.tags}
              </Segment>
              <Segment>
                <Label attached="top">مباحث ریزتر</Label>
                {this.state.subtags}
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  // state.loadedQuestion.forEach((question) => {
  // if (question.shortInfo.id === this.props.id) {
  //   return {
  //     question,
  //   };
  // }
  // });
  // question: state.questions; //TODO: what to do?!
};

export default connect(mapStateToProps)(QuestionView);
