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

import Difficulty from '../components/question/Difficulty';
import Tag from '../components/question/Tag';
import { connect } from 'react-redux';

class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.question.info.tags.map((tag) => <Tag name={tag}></Tag>),
      subtags: this.props.question.info.subtags.map((tag) => (<Tag name={tag}></Tag>)),
    };
  }

  render() {
    return (
      <Grid centered container stackable doubling style={{ direction: 'rtl' }}>
        <Grid.Row columns={2}>
          <Grid.Column
            width={11}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header
                content={this.props.question.info.name}
                as="h2"
                textAlign="center"
              />
              <Divider section></Divider>

              <Container>
                <Icon name="pencil alternate" size="large" />
                {' ' + this.props.question.questionText}
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column
            width={5}
            style={{ textAlign: 'right', direction: 'rtl' }}
          >
            <Segment>
              <Header content={'اطلاعات'} as="h2" textAlign="center" />
              <Divider></Divider>
              <br />
              <Difficulty difficulty={this.props.question.difficulty}></Difficulty>
              <br />
              <Segment textAlign="center">
                <Label attached="top">مباحث کلی</Label>
                {this.state.tags}
              </Segment>
              <Segment textAlign="center">
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

const mapStateToProps = (state) => {
  state.loadedQuestion.forEach(question => {
    if (question.shortInfo.id === this.props.id) {
      return {
        question
      }
    }
  });
  question: state.questions //TODO: what to do?!
}

export default connect(
  mapStateToProps
)(QuestionView);
