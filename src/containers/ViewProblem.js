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
import Difficulty from '../components/problem/Difficulty';
import Tag from '../components/problem/Tag';
import { connect } from 'react-redux';
import TinyPreview from '../components/editor/tiny_editor/react_tiny/Preview';
import {
  fetchProblem,
  fetchProblemsListByPage, //todo remove
} from '../redux/actions/problem'
import {
  getTags,
  getSubtags,
  getEvents,
  getSources,
} from '../redux/actions/properties'
import { sync } from 'glob';


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
  var allLabes = indexes.map((index) => {
    var name;
    // for () todo
    return (
      <Tag
        key={getAttribute(allTagNames[index - 1], 'name')}
        name={getAttribute(allTagNames[index - 1], 'name')}
      />
    );
  }
  );
  return allLabes;
}

function getBulletList(indexes, set) {
  const allTagNames = set;
  var allLabes = indexes.map((index) =>
    <li key={getAttribute(allTagNames[index - 1], 'name')} >
      {getAttribute(allTagNames[index - 1], 'name')}
    </li>
  );
  return allLabes;
}

const problemId = parseInt(window.location.pathname.split('/')[2]);

class ViewProblem extends Component {

  componentDidMount() {
    this.props.fetchProblemsListByPage(1)
    this.props.fetchProblem(problemId);
    this.props.getTags();
    this.props.getSubTags();
    this.props.getEvents();
    this.props.getSources();
  }

  render() {
    console.log(this.props.problems)
    var problem = this.props.problems[problemId];
    return (
      <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
        <Grid.Row centered relaxed>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              {problem.name ? '«' + problem.name + '»' : null}
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
                  content={getAttribute(problem, 'text') ? getAttribute(problem, 'text') : ''}
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
                  content={getAttribute(problem, 'answer') ? getAttribute(problem, 'answer') : ''}
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
                difficulty={Object(getAttribute(problem, 'hardness'))}
              ></Difficulty>
              <Segment>
                <Label attached="top">مباحث کلی سوال</Label>
                {getTagLabels([getAttribute(problem, 'tags')], this.props.tags)}
              </Segment>
              <Segment>
                <Label attached="top">مباحث ریزتر</Label>
                {getTagLabels([getAttribute(problem, 'sub_tags')], this.props.subTags)}
              </Segment>
              <Segment>
                <Label attached="top">منبع</Label>
                <div>
                  {getAttribute(this.props.sources[getAttribute(problem, 'source') - 1], 'name')}
                </div>
              </Segment>

              <Segment>
                <Label attached="top">رویداد‌های به کار رفته!</Label>
                {getBulletList([getAttribute(problem, 'source')], this.props.events)}
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  problems: state.problem.problems,
  tags: state.properties.tags,
  subTags: state.properties.subTags,
  events: state.properties.events,
  sources: state.properties.sources,
});

export default connect(
  mapStateToProps,
  {
    fetchProblem,
    fetchProblemsListByPage, //todo remove
    getTags,
    getSubtags,
    getEvents,
    getSources,
  })(ViewProblem);
