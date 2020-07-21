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


const questionsShortInfo = [
  {
    id: 123,
    name: 'مساحت و محیط رو دریاب',
    tags: ['هندسه'],
    difficulty: 3, // همونی که از ۱۰عه
    reviewStatus: 'A', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 456,
    name: 'این یا اون؟',
    tags: ['ترکیبیات', 'منطق'],
    difficulty: 5, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 789,
    name: 'Last SHAM!',
    tags: ['رمزنگاری', 'منطق', 'احتمال'],
    difficulty: 8, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 1323,
    name: 'مساحت و محیط رو دریاب',
    tags: ['هندسه'],
    difficulty: 3, // همونی که از ۱۰عه
    reviewStatus: 'A', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 3456,
    name: 'این یا اون؟',
    tags: ['ترکیبیات', 'منطق'],
    difficulty: 5, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 13789,
    name: 'Last SHAM!',
    tags: ['رمزنگاری', 'منطق'],
    difficulty: 8, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
]

class ProblemSet extends Component {
  state = {
    activePage: 1,
    totalPages: 10,
    userType: 'ADMIN', //TODO: should be "this.props.userType"
    questionsShortInfo: questionsShortInfo, //TODO: should be "this.props.questionsShortInfo"
    redirect: false,
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage, redirect: true })
  }

  render() {
    const { questionsShortInfo: data } = this.state

    if (this.state.redirect) {
      return <Redirect push to={"/problemset/page/" + this.state.activePage} />;
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
                صفحه‌ی {this.state.activePage} از {this.state.totalPages}
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
                    {this.state.userType === 'ADMIN' && (
                      <Table.HeaderCell
                        width={3}
                      >
                        وضعیت بازبینی
                      </Table.HeaderCell>
                    )}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {_.map(data, ({ id, name, tags, difficulty, reviewStatus }) => (
                    <Table.Row key={id}>
                      <Table.Cell >{id}</Table.Cell>
                      <Table.Cell textAlign='right' selectable>

                        <a href={'/question/' + id}>{name}</a>
                      </Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Label>{tags[0]}</Label>
                        {tags[1] && (
                          <Label>{tags[1]}</Label>
                        )}
                        {tags[2] && (
                          <Label>{tags[2]}</Label>
                        )}
                      </Table.Cell>
                      <Table.Cell>{difficulty}</Table.Cell>
                      {this.state.userType === 'ADMIN' && (
                        <Table.Cell>{reviewStatus}</Table.Cell>
                      )}
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
                  activePage={this.state.activePage}
                  onPageChange={this.handlePaginationChange}
                  totalPages={this.state.totalPages}
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
  const thisUser = state.thisUser;
  const userType = thisUser ? thisUser.type : null;
  return ({
    activePage: state.problemSetPageActivePage,
    totalPages: state.problemSetPageTotalPages,
    questionsShortInfo: state.questionsShortInfo,
    userType,
  })
}

export default connect(mapStatoToProps)(ProblemSet)