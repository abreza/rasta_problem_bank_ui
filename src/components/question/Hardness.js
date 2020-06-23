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

export default class Hardness extends Component {
  render() {
    return (
      <div>
        <Progress
          textAlign="center"
          value={this.props.hardness.hardnessValue}
          total={10}
          color="red"
        >
          سختی: {this.props.hardness.hardnessValue}
        </Progress>
        <Segment >
          <Icon name="child" size="large"></Icon>
          پایین‌ترین پایه‌ی مناسب:{' '}
          <b>
            {grades[this.props.hardness.minimumAppropriateGrade - 1]}
          </b>
          <br /><br />
          <Icon name="male" size="large"></Icon>
          بالاترین پایه‌ی مناسب:{' '}
          <b>
            {grades[this.props.hardness.maximumAppropriateGrade - 1]}
          </b>
        </Segment>
      </div>
    );
  }
}
