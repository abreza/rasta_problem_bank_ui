import React, { Component } from 'react';
import { Segment, Progress, Icon } from 'semantic-ui-react';

const grades = [
  'اول',
  'دوم',
  'سوم',
  'چهارم',
  'پنجم',
  'ششم',
  'هفتم',
  'هشتم',
  'نهم',
  'دهم',
  'یازدهم',
  'دوازدهم',
]

export default class Difficulty extends Component {
  render() {
    return (
      <div>
        <Progress
          textAlign="center"
          value={this.props.difficulty.level}
          total={100}
          color="red"
        >
          سختی: {this.props.difficulty.level}
        </Progress>
        <Segment >
          <Icon name="child" size="large"></Icon>
          پایین‌ترین پایه‌ی مناسب:{' '}
          <b>
            {grades[this.props.difficulty.appropriate_grades_min - 1]}
          </b>
          <br /><br />
          <Icon name="male" size="large"></Icon>
          بالاترین پایه‌ی مناسب:{' '}
          <b>
            {grades[this.props.difficulty.appropriate_grades_max - 1]}
          </b>
        </Segment>
      </div>
    );
  }
}
