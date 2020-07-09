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


const questions = [
  {
    id: 123,
    name: 'مساحت و محیط رو دریاب',
    tags: ['هندسه'],
    hardnessValue: 3, // همونی که از ۱۰عه
    reviewStatus: 'A', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 456,
    name: 'این یا اون؟',
    tags: ['ترکیبیات', 'منطق'],
    hardnessValue: 5, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 789,
    name: 'Last SHAM!',
    tags: ['رمزنگاری', 'منطق', 'احتمال'],
    hardnessValue: 8, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 1323,
    name: 'مساحت و محیط رو دریاب',
    tags: ['هندسه'],
    hardnessValue: 3, // همونی که از ۱۰عه
    reviewStatus: 'A', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 3456,
    name: 'این یا اون؟',
    tags: ['ترکیبیات', 'منطق'],
    hardnessValue: 5, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
  {
    id: 13789,
    name: 'Last SHAM!',
    tags: ['رمزنگاری', 'منطق'],
    hardnessValue: 8, // همونی که از ۱۰عه
    reviewStatus: 'W', // وضعیت بازبینی سوال توسط منتورهای بالاسری
  },
]


const isAdmin = true;

class ProblemSet extends Component {
  state = {
    activePage: 1,
    totalPages: 10,
    column: null,
    questions: questions, //TODO: should be "this.props.questions"
    direction: null,
    redirect: false,
  }

  handleSort = (clickedColumn) => () => {
    const { column, questions: data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage, redirect: true })
  }

  render() {
    const { column, questions: data, direction } = this.state

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
              <Label as='a' color='teal' ribbon='right'>
                صفحه‌ی {this.state.activePage} از {this.state.totalPages}
              </Label>
              <Table
                selectable
                color='teal'
                celled
                striped
                sortable
                fixed
                textAlign='center'
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      textAlign='center'
                      width={2}
                      sorted={column === 'id' ? direction : null}
                      onClick={this.handleSort('id')}
                    >
                      شناسه
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={3}
                      sorted={column === 'name' ? direction : null}
                      onClick={this.handleSort('name')}
                    >
                      نام
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={5}
                      sorted={column === 'tags' ? direction : null}
                      onClick={this.handleSort('tags')}
                    >
                      موضوعات اصلی
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={3}
                      sorted={column === 'hardnessValue' ? direction : null}
                      onClick={this.handleSort('hardnessValue')}
                    >
                      درجه سختی
                    </Table.HeaderCell>
                    {isAdmin && (
                      <Table.HeaderCell
                        width={3}
                        sorted={column === 'reviewStatus' ? direction : null}
                        onClick={this.handleSort('reviewStatus')}
                      >
                        وضعیت بازبینی
                      </Table.HeaderCell>
                    )}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {_.map(data, ({ id, name, tags, hardnessValue, reviewStatus }) => (
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
                      <Table.Cell>{hardnessValue}</Table.Cell>
                      {isAdmin && (
                        <Table.Cell>{reviewStatus}</Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Pagination
                activePage={this.state.activePage}
                onPageChange={this.handlePaginationChange}
                totalPages={this.state.totalPages}
              />
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

const mapStatoToProps = (state) => ({
  activePage: state.problemSetPageActivePage,
  totalPages: state.problemSetPageTotalPages,
  questions: state.questions //TODO: is "info" needed?
})

export default connect(mapStatoToProps)(ProblemSet)