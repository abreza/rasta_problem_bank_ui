import React, { Component } from 'react';
import { Grid, Segment, Progress, Divider, Icon } from 'semantic-ui-react';

export default class Hardness extends Component {
  render() {
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
    ];
    return (
      <Grid
        doubling
        centered
        container
        stackable
        style={{ direction: 'rtl' }}>
        <Segment>
          <Grid.Row>
            <Progress
              textAlign="center"
              value={this.props.hardness.hardnessValue}
              total={10}
              progress="ratio"
              color="red"
            >
              سختی
            </Progress>
            <Segment textAlign="right">
              <Icon name="child" size="large"></Icon>
              <b>
                پایین‌ترین پایه‌ی مناسب:{' '}
                {grades[this.props.hardness.minimumAppropriateGrade - 1]}
              </b>
              <Divider></Divider>

              <Icon name="male" size="large"></Icon>
              <b>
                بالاترین پایه‌ی مناسب:{' '}
                {grades[this.props.hardness.maximumAppropriateGrade - 1]}
              </b>
            </Segment>
          </Grid.Row>
        </Segment>
      </Grid>
    );
  }
}
