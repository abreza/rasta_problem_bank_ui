import React, { Component } from 'react';
import {
  Grid,
  Header,
  Container,
  Segment,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import Difficulty from '../components/problem/Difficulty';
import Tag from '../components/problem/Tag';
import { connect } from 'react-redux';
import TinyPreview from '../components/editor/tiny_editor/react_tiny/Preview';
import {
  fetchProblem,
} from '../redux/actions/problem'
import { toPersianNumber } from '../utils/translateNumber'
import {
  getTags,
  getSubtags,
  getEvents,
  getSources,
} from '../redux/actions/properties'
import { Link } from 'react-router-dom';

const problemId = parseInt(window.location.pathname.split('/')[2]);

class ViewProblem extends Component {

  componentDidMount() {
    this.props.fetchProblem(problemId);
    this.props.getTags();
    this.props.getSubtags();
    this.props.getEvents();
    this.props.getSources();
  }

  render() {
    if (this.props.problems) {
      var problem = this.props.problems[problemId];
      return (
        <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
          <Grid.Row verticalAlign='middle' columns={1}>
            <Grid.Column width={5} only="computer" style={{ textAlign: 'right' }}>
              <Button
                as={Link}
                to={"/editproblem/" + problemId}
                icon
                labelPosition="right"
                positive
              // loading={isFetching} todo
              >
                <Icon name="save" />
                {'ویرایش'}
              </Button>
            </Grid.Column>
            <Grid.Column width={5} >
              <Header as="h1" textAlign="center">
                {'«' + problem.name + '»'}
              </Header>
            </Grid.Column>
            <Grid.Column width={5} only="computer" />
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column
              width={11}
              style={{ textAlign: 'right', direction: 'rtl' }}
            >
              <Segment textAlign="center">
                <Label size="large" attached="top">
                  صورت‌مسئله
                </Label>
                <Container fluid textAlign="right" style={{ fontSize: 20 }}>
                  <br />
                  <TinyPreview
                    frameProps={{
                      frameBorder: '0',
                      scrolling: 'no',
                      width: '100%',
                    }}
                    content={problem.text}
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
                <Label size='large' attached="top">
                  شناسنامه
                </Label>
                <Difficulty
                  difficulty={problem.hardness}
                ></Difficulty>
                <Segment>
                  <Label attached="top">مباحث کلی سوال</Label>
                  {
                    this.props.tags.filter(tag => {
                      if (problem.tags.includes(tag.id)) {
                        return true;
                      }
                    }).map((tag) => (
                      <Tag
                        size={'small'}
                        name={tag.name}
                        key={tag.id}
                      />
                    ))
                  }
                </Segment>
                <Segment>
                  <Label attached="top">مباحث ریزتر</Label>
                  {
                    this.props.subtags.filter(subtag => {
                      if (problem.sub_tags.includes(subtag.id) && problem.tags.includes(subtag.parent)) {
                        return true
                      }
                    }).map((subtag) => (
                      <Tag
                        size={'small'}
                        name={subtag.name}
                        key={subtag.id}
                      />
                    ))
                  }
                </Segment>
                <Segment>
                  <Label attached="top">منبع</Label>
                  {
                    this.props.sources.filter(source => {
                      if (source.id == problem.source) {
                        return true;
                      }
                    }).map((source) => (
                      <Label
                        size={'small'}
                        key={source.id}
                      >
                        {source.name}
                      </Label>
                    ))
                  }
                </Segment>
                <Segment>
                  <Label attached="top">رویداد‌های به کار رفته</Label>
                  {
                    this.props.events.filter(event => {
                      if (problem.events.includes(event.id)) {
                        return true
                      }
                    }).map((event) => (
                      <Label
                        size={'small'}
                        key={event.id}
                      >
                        {event.name}
                      </Label>
                    ))
                  }
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Grid.Column
              width={16}
              only="mobile tablet"
              textAlign='center'
            >
              <Button
                as={Link}
                to={'/editproblem/' + problemId}
                icon
                labelPosition="right"
                positive
                className="mobile-save-btn"
              // loading={isFetching} todo
              >
                <Icon name="save" />
                {'ویرایش'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid >
      );
    } else {
      return (
        <>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    problems: state.problem.problems,
    tags: state.properties.tags,
    subtags: state.properties.subtags,
    events: state.properties.events,
    sources: state.properties.sources,
  });
}
export default connect(
  mapStateToProps,
  {
    fetchProblem,
    getTags,
    getSubtags,
    getEvents,
    getSources,
  }
)(ViewProblem);
