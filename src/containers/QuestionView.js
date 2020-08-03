import React, { Component } from 'react';
import {
  Grid,
  Header,
  Icon,
  Container,
  Segment,
  Label,
  List,
} from 'semantic-ui-react';
import Difficulty from '../components/question/Difficulty';
import Tag from '../components/question/Tag';
import { connect } from 'react-redux';
import TinyPreview from '../components/editor/tiny_editor/react_tiny/Preview';
import {
  fetchQuestion,
} from '../redux/actions/question'
import {
  getTags,
  getSubTags,
  getEvents,
  getSources,
} from '../redux/actions/properties'


function getAttribute(object, attribute) {
  var attributeValue;
  for (var i in object) {
    if (i == attribute) {
      attributeValue = object[i];
    }
  }
  return attributeValue;
}


function getTagLabels(indexes, set) {
  const allTagNames = set;
  var allLabes = indexes.map((index) =>
    <Tag
      key={getAttribute(allTagNames[index - 1], 'name')}
      name={getAttribute(allTagNames[index - 1], 'name')}
    />
  );
  return allLabes;
}

function getBulletList(indexes, set) {
  const allTagNames = set;
  var allLabes = indexes.map((index) =>
    <li
      key={getAttribute(allTagNames[index - 1], 'name')}
    >
      {getAttribute(allTagNames[index - 1], 'name')}
    </li>
  );
  return allLabes;
}



const questionId = window.location.pathname.split('/')[2];

class QuestionView extends Component {

  componentDidMount() {
    this.props.fetchQuestion(questionId);
    this.props.getTags();
    this.props.getSubTags();
    this.props.getEvents();
    this.props.getSources();
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
                <Icon name="puzzle" size="large" />
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
                  content={getAttribute(question, 'answer') ? getAttribute(question, 'answer') : ''}
                />
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >

            <Segment textAlign="center">
              <br />
              <br />
              <br />
              <Label size='large' attached="top">
                <Icon name="book" size="large" />
                {' شناسنامه'}
              </Label>
              <Difficulty
                difficulty={Object(getAttribute(question, 'hardness'))}
              ></Difficulty>
              <Segment>
                <Label attached="top">مباحث کلی سوال</Label>
                {getTagLabels([getAttribute(question, 'tags')], this.props.tags)}
              </Segment>
              <Segment>
                <Label attached="top">مباحث ریزتر</Label>
                {getTagLabels([getAttribute(question, 'sub_tags')], this.props.subTags)}
              </Segment>
              <Segment>
                <Label attached="top">منبع</Label>
                <div>
                  {getAttribute(this.props.sources[getAttribute(question, 'source') - 1], 'name')}
                </div>
              </Segment>
              <Segment>
                <Label attached="top">رویداد‌های به کار رفته!</Label>
                {getBulletList([getAttribute(question, 'source')], this.props.events)}
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
  tags: state.properties.tags,
  subTags: state.properties.subTags,
  events: state.properties.events,
  sources: state.properties.sources,
});

export default connect(
  mapStateToProps,
  {
    fetchQuestion,
    getTags,
    getSubTags,
    getEvents,
    getSources,
  })(QuestionView);
