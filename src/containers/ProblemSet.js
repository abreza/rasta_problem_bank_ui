import _ from 'lodash'
import React, { Component } from 'react';
import {
  Grid,
  Header,
  Segment,
  Divider,
  Label,
  Table,
  Pagination,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchProblemsListByPage } from '../redux/actions/problem'
import Tag from '../components/problem/Tag';
import { getTags } from '../redux/actions/properties'

const activePage = parseInt(window.location.pathname.split('/')[3]);

class ProblemSet extends Component {
  state = {
    redirect: false,
    doesClickedOnAnyProblem: false,
    clickedProblemId: '',
    activePage: '',
  }

  componentDidMount() {
    this.props.fetchProblemsListByPage(activePage);
    this.props.getTags();
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage, redirect: true })
  }

  render() {
    const { problems } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={"/problemset/page/" + this.state.activePage} />;
    }

    if (this.state.doesClickedOnAnyProblem) {
      return <Redirect push to={"/problem/" + this.state.clickedProblemId} />;
    }

    return (
      <Grid
        centered
        container
        stackable
        doubling
        style={{ direction: 'rtl' }}
      >
        <Grid.Row centered relaxed>
          <Header as="h1" textAlign="center">
            سوالات
          </Header>
        </Grid.Row>
        <Grid.Row columns={2}>

          <Grid.Column width={10}>
            <Segment>
              <Label color='teal' ribbon='right'>
                صفحه‌ی {activePage} از {this.props.totalNumberOfPages}
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
                      width={2}
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
                      <Table.Cell >{id}</Table.Cell>
                      <Table.Cell textAlign='right' selectable>
                        <a
                          href={''}
                          onClick={() => this.setState({ enteredProblem: true, enteredProblemId: id })} //todo:
                        >
                          {name}
                        </a>
                      </Table.Cell>
                      < Table.Cell textAlign='right' >
                        {
                          this.props.tags.filter(tag => {
                            if (tags.includes(tag.id)) {
                              return true
                            }
                          }).map((tag) => (
                            <Tag
                              size={'small'}
                              name={tag.name}
                              key={tag.id}
                            />
                          ))
                        }
                      </Table.Cell>
                      <Table.Cell>{difficulty.level}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <Pagination
                  activePage={activePage}
                  onPageChange={this.handlePaginationChange}
                  totalPages={this.props.totalNumberOfPages}
                />
              </div>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header content={'جستجو'} as="h2" textAlign="center" />
              <Divider></Divider>
              <Header content={'به زودی :)'} as="h3" textAlign="center" />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid >
    );
  }
}

const mapStatoToProps = (state) => {
  return ({
    tags: state.properties.tags,
    problems: state.problem.problems,
    totalNumberOfPages: state.problem.numberOfPages,
  })
}

export default connect(mapStatoToProps, {
  fetchProblemsListByPage,
  getTags,
})(ProblemSet)