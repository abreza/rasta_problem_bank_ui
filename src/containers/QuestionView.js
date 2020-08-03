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
import {
  fetchQuestion,
  fetchQuestionProperties,
} from '../redux/actions/question'


function getAttribute(object, attribute) {
  var attributeValue;
  for (var i in object) {
    if (i == attribute) {
      attributeValue = object[i];
    }
  }
  return attributeValue;
}

const questionId = window.location.pathname.split('/')[2];

class QuestionView extends Component {

  componentDidMount() {
    this.props.fetchQuestion(questionId);
    if (this.props.properties) {
      this.props.fetchQuestionProperties();
    }
  }

  getTags(tagIndexes) {
    const allTagNames = sampleQuestion.tags;// this.props.properties.tags; (todo)
    var allLabes = tagIndexes.map((index) => (
      <Tag key={allTagNames[index]} name={allTagNames[index]} />
    ));
    return allLabes;
  }


  render() {
    var question;
    for (var i in this.props.questions) {
      if (this.props.questions[i].id == questionId) {
        question = this.props.questions[i];
      }
    }
    return (
      <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
        <Grid.Row centered relaxed>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              {getAttribute(question, 'name') ? '«' + getAttribute(question, 'name') + '»' : null}
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
                {' صورت‌مسئله'}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20 }}>
                <br />
                <TinyPreview
                  frameProps={{
                    frameBorder: '0',
                    scrolling: 'no',
                    width: '100%',
                  }}
                  content={getAttribute(question, 'text') ? getAttribute(question, 'text') : ''}
                />
              </Container>
            </Segment>

            <Segment textAlign="center">
              <Label size="large" attached="top">
                <Icon name="book" size="large" />
                {' پاسخ'}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20 }}>
                <br />
                <TinyPreview
                  frameProps={{
                    frameBorder: '0',
                    scrolling: 'no',
                    width: '100%',
                  }}
                  content={getAttribute(question, 'answer') ? getAttribute(question, 'answer') : 'فعلاً پاسخی برای این سوال نیست. از شما عذرخواهی‌ می‌کنیم :('}
                />
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
              <Difficulty
                difficulty={Object(getAttribute(question, 'hardness'))}
              ></Difficulty>
              <Segment>
                <Label attached="top">مباحث کلی سوال</Label>
                {this.getTags([getAttribute(question, 'tags')])}
              </Segment>
              <Segment>
                <Label attached="top">مباحث ریزتر</Label>
                {this.getTags([getAttribute(question, 'sub_tags')])}
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  properties: state.question.properties,
});

export default connect(
  mapStateToProps,
  {
    fetchQuestion,
    fetchQuestionProperties,
  })(QuestionView);
