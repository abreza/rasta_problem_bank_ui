import React, { Component } from 'react';
import { Grid, Segment, Progress, Divider, Icon } from 'semantic-ui-react';

export default class Hardness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [
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
      ],

    }
  }
  render() {
    return (
      <Grid
        doubling
        centered
        container
        stackable
        style={{ direction: 'rtl' }}
      >
        <Segment>
          <Grid.Row>
            <Progress
              textAlign="center"
              value={this.props.hardness.hardnessValue}
              total={10}
              color="red"
            >
              سختی: {this.props.hardness.hardnessValue}
            </Progress>
            <Segment textAlign="right">
              <Icon name="child" size="large"></Icon>
              پایین‌ترین پایه‌ی مناسب:{' '}
              <b>
                {this.state.grades[this.props.hardness.minimumAppropriateGrade - 1]}
              </b>
              <br /><br />
              <Icon name="male" size="large"></Icon>
              بالاترین پایه‌ی مناسب:{' '}
              <b>
                {this.state.grades[this.props.hardness.maximumAppropriateGrade - 1]}
              </b>
            </Segment>
          </Grid.Row>
        </Segment>
      </Grid>
    );
  }
}
