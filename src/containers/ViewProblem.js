import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Container,
  Segment,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Difficulty from '../components/problem/Difficulty';
import Tag from '../components/problem/Tag';
import { connect } from 'react-redux';
import Comment from '../components/problem/Comment';
import CreateComment from '../components/problem/CreateComment';
import { useHistory } from "react-router-dom";
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
import {
  getUser,
} from '../redux/actions/account'

const problemId = parseInt(window.location.pathname.split('/')[2]);

const ViewProblem = ({
  fetchProblem,
  getTags,
  getEvents,
  getSources,
  problems,
  getSubtags,
  tags,
  subtags,
  events,
  sources,
  getUser,
  users,
}) => {
  const [problem, setProblem] = useState('');
  const [questionMaker, setQuestionMaker] = useState('')
  let history = useHistory();

  useEffect(() => {
    fetchProblem(problemId);
    getTags();
    getSubtags();
    getEvents();
    getSources();
  }, [fetchProblem, getTags, getSubtags, getEvents, getSources]);

  useEffect(() => {
    if (users && users.find(user => user.id == problem.question_maker)) {
      setQuestionMaker(users.find(user => user.id == problem.question_maker))
    }
  }, [users, problem])

  useEffect(() => {
    if (problems && problems.find(problem => problem.id == problemId)) {
      const problem = problems.find(problem => problem.id == problemId);
      setProblem(problem);
      getUser(problem.question_maker)
    }
  }, [problems]);

  console.log(problem.events)

  return (
    <>
      {problem && questionMaker &&
        <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
          <Grid.Row verticalAlign='middle' columns={1} style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Grid.Column width={5} only="computer" style={{ textAlign: 'center' }}>
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
            <Grid.Column width={6} >
              <Header as="h1" textAlign="center">
                {'«' + problem.name + '»'}
              </Header>
            </Grid.Column>
            <Grid.Column width={5} only="computer" style={{ textAlign: 'center' }}>
              <Button
                onClick={() => history.goBack()}
                icon
                labelPosition='left'
                color='blue'
              >
                <Icon name='reply' />
                {'بازگشت'}
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column
              width={11}
              style={{ textAlign: 'right', direction: 'rtl' }}
            >
              <Segment textAlign="center" style={{ paddingBottom: '30px' }}>
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
                <Label size="large" attached="bottom left">
                  {`اضافه‌کننده: ${questionMaker.first_name} ${questionMaker.last_name}`}
                </Label>
              </Segment>
              <Segment textAlign="center">
                <Label size="large" attached="top" >
                  نظرات
                </Label>
                {problem.comments &&
                  problem.comments.map(comment => {
                    return <Comment text={comment.text} commenterId={comment.writer} />
                  })
                }
                <CreateComment id={problemId} />
              </Segment>
            </Grid.Column>

            <Grid.Column
              width={5}
              style={{ textAlign: 'right', direction: 'rtl' }}
            >

              <Segment textAlign="center">
                <br />
                <br />
                <Label size='large' attached="top" >
                  شناسنامه
                </Label>
                <Difficulty
                  difficulty={problem.hardness}
                ></Difficulty>
                {problem.tags && problem.tags.length > 0 &&
                  <Segment >
                    <Label attached="top">مباحث کلی سوال</Label>
                    {
                      tags.filter(tag => {
                        if (problem.tags.includes(tag.id)) {
                          return true;
                        }
                      }).map((tag) => (
                        <Tag
                          selectable
                          size={'small'}
                          name={tag.name}
                          key={tag.id}
                        />
                      ))
                    }
                  </Segment>
                }
                {problem.sub_tags && problem.sub_tags.length > 0 &&
                  <Segment>
                    <Label attached="top">مباحث ریزتر</Label>
                    {
                      subtags.filter(subtag => {
                        if (problem.sub_tags.includes(subtag.id) && problem.tags.includes(subtag.parent)) {
                          return true
                        }
                      }).map((subtag) => (
                        <Tag
                          selectable
                          size={'small'}
                          name={subtag.name}
                          key={subtag.id}
                        />
                      ))
                    }
                  </Segment>
                }
                {problem.source && problem.source.length > 0 &&
                  <Segment>
                    <Label attached="top">منبع</Label>
                    {
                      sources.filter(source => {
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
                }
                {problem.events && problem.events.length > 0 &&
                  <Segment>
                    <Label attached="top">رویداد‌های به کار رفته</Label>
                    {
                      events.filter(event => {
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
                }
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
      }
    </>
  );

}


const mapStateToProps = (state) => {
  return ({
    problems: state.problem.problems,
    tags: state.properties.tags,
    subtags: state.properties.subtags,
    events: state.properties.events,
    sources: state.properties.sources,
    users: state.account.users,
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
    getUser,
  }
)(ViewProblem);
