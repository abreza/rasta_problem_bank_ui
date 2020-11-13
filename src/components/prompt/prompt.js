import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {
  TransitionablePortal,
  Header,
  Segment,
} from 'semantic-ui-react'


const Prompt = ({ open, header, text, color }) => {
  const [promptStatus, setPromptStatus] = useState(false)
  useEffect(
    () => {
      setPromptStatus(open)
    }
    , [open])
  return (
    <TransitionablePortal
      open={promptStatus}
      onOpen={() =>
        setTimeout(() => setPromptStatus(false), 2000)
      }
    >
      <Segment
        inverted
        color={color}
        style={{ direction: 'rtl', position: 'fixed', left: '2%', bottom: '2%', zIndex: 1000 }}
      >
        <Header>{header}</Header>
        <p>{text}</p>
      </Segment>
    </TransitionablePortal>
  )
}

const mapStateToProps = (state) => ({
  open: state.account.promptStatus,
  header: state.account.promptHeader,
  text: state.account.promptText,
  color: state.account.promptColor,
})

export default connect(
  mapStateToProps,
  {}
)(Prompt)