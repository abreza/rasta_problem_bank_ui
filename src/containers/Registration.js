import React, { useState, useEffect, Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/account';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';



const Registration = ({ isFetching, isLoggedIn, register }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()

  function confirmPassword(e) {
    let elem = e.target;
    if (password !== elem.value) {
      elem.setCustomValidity("رمزهای عبورت یکسان نیستند!");
    } else {
      elem.setCustomValidity('');
    }
  }

  async function handleSubmit(event) {
    const ok = isFormDataOk()
    if (ok) {
      register(username, password, firstName, lastName, phoneNumber, email);
    }
  }

  function isFormDataOk() {
    return true //todo: validate data
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <Container>
      <Grid centered doubling container stackable>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column
            textAlign='center'
            width={6}
          >
            <Header as="h2" textAlign="center">
              ثبت‌نام
            </Header>

            <Segment>
              <Form
                size="large"
                onSubmit={handleSubmit}
                loading={isFetching}
              >
                <Form.Input
                  name="username"
                  type="username"
                  required
                  fluid
                  // icon="user"
                  // iconPosition="right"
                  placeholder="نام کاربری"
                  className="persian-input"
                  value={username}
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                >
                  <input style={{ direction: 'ltr' }} />
                </Form.Input>

                <Form.Input
                  name="password_confirmation"
                  required
                  fluid
                  // icon="lock"
                  // iconPosition="right"
                  placeholder="تکرار رمز عبور"
                  type="password"
                  className="persian-input"
                  onChange={confirmPassword}
                >
                  <input style={{ direction: 'ltr' }} />
                </Form.Input>

                <Form.Input
                  name="firstName"
                  required
                  fluid
                  // icon="user" //todo
                  // iconPosition="right"
                  placeholder="نام"
                  type="name"
                  className="persian-input"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                >
                  <input style={{ direction: 'rtl', textAlign: 'right' }} />
                </Form.Input>

                <Form.Input
                  name="lastName"
                  required
                  fluid
                  // icon="user" //todo
                  // iconPosition="right"
                  placeholder="نام خانوادگی"
                  type="name"
                  className="persian-input"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                >
                  <input style={{ direction: 'rtl', textAlign: 'right' }} />
                </Form.Input>

                <Form.Input
                  name="phoneNumber"
                  required
                  fluid
                  // icon="phone"
                  // iconPosition="right"
                  placeholder="شماره موبایل"
                  type="phone" //todo:
                  className="persian-input"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                >
                  <input style={{ direction: 'ltr' }} />
                </Form.Input>

                <Form.Input
                  name="email"
                  required
                  fluid
                  // icon="mail"
                  // iconPosition="right"
                  placeholder="ایمیل"
                  type="mail" //todo  
                  className="persian-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                >
                  <input style={{ direction: 'ltr' }} />
                </Form.Input>

                <Button primary fluid size="large" onClick disabled={isFetching}>
                  ثبت‌نام
                </Button>
              </Form>
            </Segment>
            <Message style={{ direction: 'rtl' }}>
              قبلاً ثبت‌نام کردی؟ <Link to="/login">وارد شو!</Link>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid >
    </Container>
  );
}


const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
  isRegistered: state.account.isRegistered,
  isLoggedIn: state.account.token,
  wasRegistrationFailed: state.account.wasRegistrationFailed,
})

export default connect(mapStateToProps, {
  register,
})(Registration)