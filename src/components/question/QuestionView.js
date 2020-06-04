import React, { Component } from 'react';
import {
  Grid,
  Header,
  Icon,
  Container,
  Segment,
  Divider,
  Label,
} from 'semantic-ui-react';

import sampleQuestion from './sampleQuestion';
import Hardness from './Hardness';
import Tag from './Tag';

export default class QuestionView extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         books: [],
  //     };
  //     this.loadBooks = this.loadBooks.bind(this);
  // }

  // componentWillMount() {
  //     this.loadBooks();
  // }

  // async loadBooks() {
  //     const promise = await axios.get("http://localhost:8000/book/");
  //     const status = promise.status;
  //     if (status === 200) {
  //         const data = promise.data.data;
  //         this.setState({ books: data });
  //     }
  // }

  render() {
    const tags = sampleQuestion.tags.map((tag) => <Tag name={tag}></Tag>);
    const subtags = sampleQuestion.subtags.map((tag) => <Tag name={tag}></Tag>);

    return (
      <Grid
        centered
        container
        stackable
        doubling
        style={{ direction: 'rtl' }}
      >
        <Grid.Row columns={2}>
          <Grid.Column
            width={11}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header
                content={sampleQuestion.name}
                as="h2"
                textAlign="center"
              />
              <Divider section></Divider>

              <Container>
                <Icon name="pencil alternate" size="large" />
                {' ' + sampleQuestion.question}
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header content={'شناسنامه'} as="h2" textAlign="center" />
              <Divider></Divider>
              <br />
              <Hardness hardness={sampleQuestion.hardness}></Hardness>
              <br />
              <Segment textAlign="center">
                <Label attached="top">مباحث کلی سوال</Label>
                {tags}
              </Segment>
              <Segment textAlign="center">
                <Label attached="top">مباحث ریزتر</Label>
                {subtags}
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      // <div>
      //     <h1>Books</h1>
      //     {this.state.books.map((value, index) => { return <h4 key={index}>{value}</h4> })}
      // </div>
    );
  }
}
