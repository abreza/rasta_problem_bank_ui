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
  constructor(props) {
    super(props);
    this.state = {
      question: sampleQuestion, // temporary
      questionURL: "https://bank.rastaiha.ir/problemset/problem/",
      tags: sampleQuestion.tags.map((tagName, i) => <Tag key={tagName} name={tagName}></Tag>),
      subtags: sampleQuestion.subtags.map((tagName, i) => <Tag key={tagName} name={tagName}></Tag>),
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     questionURL: this.state.questionURL + this.props.id,
  //   });

  //   fetch(this.state.questionURL)
  //     .then((response) => {
  //       response.json()
  //     })
  //     .then(
  //       (json) => {
  //         this.setState({
  //         })
  //       }
  //     )
  //     .catch(
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }


  render() {
    return (
      <Grid
        centered
        container
        stackable
        doubling
        style={{ direction: 'rtl' }}
      >

        <Grid.Row centered relaxed>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              {'«' + this.state.question.name + '»'}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column
            width={11}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment textAlign="center">
              <Label size="large" attached="top">
                <Icon name="pencil" size="large" />
                {" صورت مسئله"}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20, }} >
                <br />
                {this.state.question.questionText}
              </Container>
            </Segment>

            <Segment textAlign="center">
              <Label size="large" attached="top">
                <Icon name="book" size="large" />
                {" پاسخ"}
              </Label>
              <Container fluid textAlign="right" style={{ fontSize: 20, }}>
                <br />
                {this.state.question.answer.answer}
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment textAlign="center">
              <Header content={'شناسنامه'} as="h2" textAlign="center" />
              <Divider section></Divider>
              <Hardness hardness={this.state.question.hardness}></Hardness>
              <Segment>
                <Label attached="top">مباحث کلی سوال</Label>
                {this.state.tags}
              </Segment>
              <Segment>
                <Label attached="top">مباحث ریزتر</Label>
                {this.state.subtags}
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}