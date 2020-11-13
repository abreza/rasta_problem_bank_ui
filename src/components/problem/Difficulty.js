import React, { Component } from 'react';
import { Segment, Progress, Icon } from 'semantic-ui-react';
import { toPersianNumber } from '../../utils/translateNumber'


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

export default (props) => {
  return (
    <div>
      <Progress
        textAlign="center"
        value={props.difficulty.level}
        total={100}
        color="red"
      >
        سختی: {toPersianNumber(props.difficulty.level)}
      </Progress>
      <Segment >
        پایین‌ترین پایه‌ی مناسب:
        <b>
          {' ' + grades[props.difficulty.appropriate_grades_min - 1]}
        </b>
        <br />
        بالاترین پایه‌ی مناسب:
        <b>
          {' ' + grades[props.difficulty.appropriate_grades_max - 1]}
        </b>
      </Segment>
    </div>
  );
}
