import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import { login } from '../redux/actions/account';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const Login = ({ isFetching, isLoggedIn, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
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
                    // icon="user"
                    // iconPosition="right"
                    placeholder="نام کاربری"
                    className="persian-input"
                    onChange={(event) => setUsername(event.target.value)}
                  >
                    <input style={{ direction: 'ltr' }} />
                  </Form.Input>

                  <Form.Input
                    name="password"
                    required
                    fluid
                    // icon="lock"
                    // iconPosition="right"
                    placeholder="رمز عبور"
                    type="password"
                    className="persian-input"
                    onChange={(event) => setPassword(event.target.value)}
                  >
                    <input style={{ direction: 'ltr' }} />
                  </Form.Input>

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
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.token,
  wasLoginFailed: state.account.wasLoginFailed,
  isFetching: state.account.isFetching,
})

export default connect(
  mapStateToProps,
  {
    login,
  }
)(Login)