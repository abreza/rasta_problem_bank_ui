import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchProblemsListByPage } from '../redux/actions/problem'
import Tag from '../components/problem/Tag';
import { getTags } from '../redux/actions/properties'
import { Link } from 'react-router-dom';
import { toPersianNumber } from '../utils/translateNumber'


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: theme.spacing(1) / 3,
  },
}))


const ProblemSet = ({
  fetchProblemsListByPage,
  getTags,
  problems,
  tags: allTags,
  totalNumberOfPages,
  isFetching
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(parseInt(window.location.pathname.split('/')[3]))

  useEffect(() => {
    fetchProblemsListByPage(parseInt(window.location.pathname.split('/')[3]));
    getTags();
  }, [])

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value)
    history.push(`/problemset/page/${value}`)
  }

  const handleTagClick = (event) => {

  }

  return (
    <Container className={classes.container}>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">«سوالات»</Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} md={10} lg={8}>
          <Grid item container xs={12} md={8} direction='column' spacing={2}>
            <Grid item>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>شناسه</TableCell>
                      <TableCell>نام</TableCell>
                      <TableCell>موضوعات اصلی</TableCell>
                      <TableCell>درجه سختی</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {problems.map((problem, index) =>
                      <TableRow key={index}>
                        <TableCell>{toPersianNumber(problem.id)}</TableCell>
                        <TableCell >
                          <a as={Link} href={'/problem/' + problem.id}>{problem.name}</a>
                        </TableCell>
                        <TableCell>
                          {allTags
                            .filter(tag => problem.tags.includes(tag.id))
                            .map((tag, index) => (
                              <Chip
                                className={classes.chip}
                                key={index}
                                label={tag.name}
                                color='primary'
                                clickable
                                onClick={handleTagClick}
                              />
                            ))}
                        </TableCell>
                        <TableCell>{toPersianNumber(problem.hardness.level)}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Pagination
                count={totalNumberOfPages}
                page={currentPage}
                onChange={handlePaginationChange}
                hidePrevButton hideNextButton
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h2" align='center'>جستجو</Typography>
              <hr />
              <Typography variant="h3" textAlign="center" >به زودی :)</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
    </Container>
  );
}

const mapStateToProps = (state) => {
  return ({
    tags: state.properties.tags
      ? state.properties.tags
      : [],
    problems: state.problem.problems
      ? state.problem.problems
      : [],
    totalNumberOfPages: state.problem.numberOfPages,
    isFetching: state.problem.isFetching,
  })
}

export default connect(
  mapStateToProps,
  {
    fetchProblemsListByPage,
    getTags,
  }
)(ProblemSet)