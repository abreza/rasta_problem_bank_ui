import React, { useState, useEffect } from 'react'

import {
  Grid,
  Header,
  Container,
  Segment,
  Label,
  Button,
  Icon,
  TextArea,
  Form,
} from 'semantic-ui-react';
import {
  createComment
} from '../../redux/actions/problem'
import { connect } from 'react-redux';

const CreateComment = ({
  createComment,
  id,
}) => {
  const [text, setText] = useState('');
  return (
    <Form style={{ textAlign: 'left' }} onSubmit={() => createComment(text, id)}>
      <TextArea
        onChange={(e) => setText(e.target.value)}
        placeholder='تو هم با نوشتن نظرت، مارو خوشحال کن!' />
      <Button
        disabled={!text}
        positive
        style={{ marginTop: '10px' }}>
        ارسال
      </Button>
    </Form>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return ({
    id
  })
};


export default connect(
  mapStateToProps,
  {
    createComment
  }
)(CreateComment);