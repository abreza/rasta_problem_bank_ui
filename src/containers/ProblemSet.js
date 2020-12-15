import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Header,
  Segment,
  Divider,
  Label,
  Table,
  Pagination,
  Container,
  Icon,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchProblemsListByPage } from '../redux/actions/problem'
import Tag from '../components/problem/Tag';
import { getTags } from '../redux/actions/properties'
import { Link } from 'react-router-dom';
import { toPersianNumber } from '../utils/translateNumber'



const ProblemSet = ({
  fetchProblemsListByPage,
  getTags,
  problems,
  tags: allTags,
  totalNumberOfPages,
  isFetching
}) => {

  const [redirect, setRedirect] = useState(false)
  const [activePage, setActivePage] = useState(parseInt(window.location.pathname.split('/')[3]))

  useEffect(() => {
    fetchProblemsListByPage(parseInt(window.location.pathname.split('/')[3]));
    getTags();
  }, [fetchProblemsListByPage, getTags])

  function handlePaginationChange(e, { activePage }) {
    setActivePage(activePage)
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={`/problemset/page/${activePage}`} />;
  }

  return (
    <Container style={{ direction: 'rtl' }}>
      <Grid centered stackable container doubling>
        <Grid.Row verticalAlign='middle' columns={1}>
          <Grid.Column style={{ textAlign: 'right' }}>
            <Header as="h1" textAlign="center">
              {'«سوالات»'}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10} >
            <Segment loading={isFetching}>
              <Label color='teal' ribbon='right'>
                صفحه‌ی {toPersianNumber(activePage)} از {toPersianNumber(totalNumberOfPages)}
              </Label>
              <Table
                selectable
                color='teal'
                celled
                striped
                fixed
                textAlign='center'
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      textAlign='center'
                      width={3}
                    >
                      شناسه
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={3}
                    >
                      نام
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={5}
                    >
                      موضوعات اصلی
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={3}
                    >
                      درجه سختی
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {_.map(problems, ({ id, name, tags, hardness: difficulty, reviewStatus }) => (
                    <Table.Row key={id}>
                      <Table.Cell >{toPersianNumber(id)}</Table.Cell>
                      <Table.Cell textAlign='right' selectable>
                        <a
                          as={Link}
                          href={'/problem/' + id}
                        >
                          {name}
                        </a>
                      </Table.Cell>
                      < Table.Cell textAlign='right' >
                        {
                          allTags.filter(tag => {
                            if (tags.includes(tag.id)) {
                              return true
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
                      </Table.Cell>
                      <Table.Cell>{toPersianNumber(difficulty.level)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Pagination
                ellipsisItem={null}
                activePage={activePage}
                firstItem={{ content: <Icon name='angle double right' />, icon: true }}
                lastItem={{ content: <Icon name='angle double left' />, icon: true }}
                prevItem={{ content: <Icon name='angle right' />, icon: true }}
                nextItem={{ content: <Icon name='angle left' />, icon: true }}
                onPageChange={handlePaginationChange}
                totalPages={totalNumberOfPages}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header content={'جستجو'} as="h2" textAlign="center" />
              <Divider />
              <Header content={'به زودی :)'} as="h3" textAlign="center" />
            </Segment>
          </Grid.Column>
        </Grid.Row>
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
    totalNumberOfPages: state.problem.numberOfPages
      ? state.problem.numberOfPages
      : '',
    isFetching: state.problem.isFetching
      ? state.problem.isFetching
      : '',
  })
}

export default connect(
  mapStateToProps,
  {
    fetchProblemsListByPage,
    getTags,
  }
)(ProblemSet)