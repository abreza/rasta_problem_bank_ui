import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
  TransitionablePortal,
} from 'semantic-ui-react';
import { login } from '../redux/actions/account';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const Login = ({ isFetching, isLoggedIn, wasLoginFailed, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [promptStatus, setPromptStatus] = useState(false)

  const handleSubmit = (event) => {
    login(username, password);
    setPromptStatus(true)
    event.preventDefault();
  }

  if (isLoggedIn) {
    return <Redirect push to={"/"} />
  }

  return (
    <>
      < Container >
        <Grid centered container doubling stackable>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column
              textAlign='center'
              width={6}
            >
              <Header as="h2" textAlign="center">
                ورود
              </Header>
              <Segment>
                <Form
                  size="large"
                  onSubmit={handleSubmit}
                  loading={isFetching}
                >
                  <Form.Input
                    name="username"
                    required
                    fluid
                    icon="user"
                    iconPosition="right"
                    placeholder="نام کاربری"
                    className="persian-input"
                    onChange={(event) => setUsername(event.target.value)}
                  />

                  <Form.Input
                    name="password"
                    required
                    fluid
                    icon="lock"
                    iconPosition="right"
                    placeholder="رمز عبور"
                    type="password"
                    className="persian-input"
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <Button primary fluid size="large" disabled={isFetching}>
                    بزن بریم
                  </Button>
                </Form>
              </Segment>

              <Message style={{ direction: 'rtl' }}>
                هنوز ثبت‌نام نکردی؟ <Link to="/registration">ثبت‌نام کن!</Link>
              </Message>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >

      {/* Prompts: */}

      <TransitionablePortal
        closeOnTriggerClick
        open={promptStatus && wasLoginFailed}
        onOpen={() =>
          setTimeout(() => setPromptStatus(false), 2000)
        }
        openOnTriggerClick
      >
        <Segment
          inverted
          color='red'
          style={{ direction: 'rtl', position: 'fixed', left: '2%', bottom: '2%', zIndex: 1000 }}
        >
          <Header>نام کاربری یا رمز عبورت اشتباهه</Header>
          <p>یه بار دیگه تلاش کن.</p>
        </Segment>
      </TransitionablePortal>

      {/* <TransitionablePortal
        closeOnTriggerClick
        open={wasLoginSuccessful && !wasPromptOpened}
        onOpen={() =>
          setTimeout(() => setPromptStatus(true), 2000)
        }
        openOnTriggerClick
      >
        <Segment
          inverted
          color='green'
          style={{ direction: 'rtl', position: 'fixed', left: '2%', bottom: '2%', zIndex: 1000 }}
        >
          <Header>خوش اومدی رستایی!</Header>
          <p>مسئله‌ها منتظر تو هستند...</p>
        </Segment>
      </TransitionablePortal> */}
    </>
  );
}


const mapStatoToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
  wasLoginFailed: state.account.wasLoginFailed,
  isFetching: state.account.isFetching,
})

export default connect(mapStatoToProps, {
  login,
})(Login)