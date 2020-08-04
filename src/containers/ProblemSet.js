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
import { fetchQuestionListByPage } from '../redux/actions/question'
import { ROOT } from '../redux/actions/URLs'
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

class ProblemSet extends Component {
  state = {
    userType: 'ADMIN', //TODO: should be "this.props.userType"
    redirect: false,
    enterQuestion: false,
    enteredQuestionId: '',
  }

  getActivePage() {
    return window.location.pathname.split('/')[3];
  }

  componentDidMount() {
    this.props.fetchQuestionListByPage(this.getActivePage);
    this.props.getTags();
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage, redirect: true })
  }

  render() {
    const questions = this.props.thisPageQuestions;

    if (this.state.redirect) {
      return <Redirect push to={"/problemset/page/" + this.state.activePage} />;
    }

    if (this.state.enterQuestion) {
      return <Redirect push to={"/question/" + this.state.enteredQuestionId} />;
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

          <Grid.Column width={11}>
            <Segment>
              <Label color='teal' ribbon='right'>
                صفحه‌ی {this.getActivePage()} از {this.props.totalNumberOfPages}
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
                  {_.map(questions, ({ id, name, tags, hardness: difficulty, reviewStatus }) => (
                    <Table.Row key={id}>
                      <Table.Cell >{id}</Table.Cell>
                      <Table.Cell textAlign='right' selectable>
                        <a
                          href={''}
                          onClick={() => this.setState({ enterQuestion: true, enteredQuestionId: id })} //todo:
                        >
                          {name}
                        </a>
                      </Table.Cell>
                      < Table.Cell textAlign='right' >
                        <Label>{getAttribute(this.props.tags.filter(tag => { return tag.id === tags[0] })[0], 'name')}</Label>
                        {
                          tags[1] && (
                            <Label>{getAttribute(this.props.tags.filter(tag => { return tag.id === tags[1] })[0], 'name')}</Label>
                          )
                        }
                        {
                          tags[2] && (
                            <Label>{getAttribute(this.props.tags.filter(tag => { return tag.id === tags[2] })[0], 'name')}</Label>
                          )
                        }
                      </Table.Cell>
                      <Table.Cell>{getAttribute(difficulty, 'level')}</Table.Cell>
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
                  activePage={this.getActivePage()}
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
  // const thisUser = state.thisUser;
  // const userType = thisUser ? thisUser.type : null;
  return ({
    tags: state.properties.tags,
    thisPageQuestions: state.question.allQuestions,
    totalNumberOfPages: state.question.totalNumberOfPages,
  })
}

export default connect(mapStatoToProps, {
  fetchQuestionListByPage,
  getTags,
})(ProblemSet)