import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  makeStyles,
  Divider,
  Button,
} from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

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
  const classes = useStyles();
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

  return (
    <>
      <Container className={classes.container}>
        {problem && questionMaker &&
          <Grid container spacing={2} justify='center'>
            <Grid item xs={12}>
              <Typography variant='h1' align="center">{`«${problem.name}»`}</Typography>
            </Grid>
            <Grid container item spacing={2} xs={12} md={10} lg={8}>
              <Grid container item direction='column' xs={12} md={8} spacing={2}>
                <Grid item>
                  <Paper className={classes.paper}>
                    <Typography gutterBottom variant='h3' align='center'>صورت مسئله</Typography>
                    <Divider className={classes.divider} />
                    <TinyPreview
                      frameProps={{
                        frameBorder: '0',
                        scrolling: 'no',
                        width: '100%',
                      }}
                      content={problem.text} />
                    <Divider className={classes.divider} />
                    <Typography variant='h6' align='right'>
                      {`اضافه‌کننده: ${questionMaker.first_name} ${questionMaker.last_name}`}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column'>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>نظرات</Typography>
                      </Grid>
                      {problem.comments &&
                        problem.comments.map(comment => {
                          return <Comment text={comment.text} commenterId={comment.writer} />
                        })
                      }
                      <CreateComment id={problemId} />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4} direction='column' spacing={2}>
                <Grid item>
                  <Button variant='contained' color='primary' href={'/editproblem/' + problemId} fullWidth>ویرایش</Button>
                </Grid>
                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column' spacing={2}>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>اطلاعات</Typography>
                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item>
                        <Difficulty difficulty={problem.hardness} />
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>مباحث کلی:</Typography>
                        {
                          tags
                            .filter(tag => problem.tags.includes(tag.id))
                            .map((tag, index) =>
                              <Tag name={tag.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>مباحث جزئی‌تر:</Typography>
                        {
                          subtags
                            .filter(subtag => problem.sub_tags.includes(subtag.id))
                            .map((subtag, index) =>
                              <Tag name={subtag.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>منبع:</Typography>
                        {
                          sources
                            .filter(source => problem.source === source.id)
                            .map((source, index) =>
                              <Tag name={source.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>رویدادهای به‌کاررفته:</Typography>
                        {
                          events
                            .filter(event => problem.events.includes(event.id))
                            .map((event, index) =>
                              <Tag name={event.name} key={index} />)
                        }
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid >
        }
      </Container>
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
