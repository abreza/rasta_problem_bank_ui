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
import { register, setPrompt } from '../redux/actions/account';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';



const Registration = ({ isFetching, isRegistered, wasRegistrationFailed, isLoggedIn, register, setPrompt }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [didPageLoadNewly, setPageLoadStatus] = useState(true)

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
      register(username, password, firstname, lastname, phoneNumber, email);
      setPageLoadStatus(false)
      event.preventDefault();
    }
  }

  function isFormDataOk() {
    return true //todo: validate data
  }

  useEffect(() => {
    if (wasRegistrationFailed && !didPageLoadNewly) {
      setPrompt(
        'یه‌جای کار می‌لنگه...',
        'یه‌بار دیگه تلاش کن!',
        'red',
      )
    }
    return () => {
      if (isRegistered && !didPageLoadNewly) {
        setPrompt(
          'ورودت به بانک مسئله رو تبریک می‌گم!',
          'حالا باید وارد بشی...',
          'green',
        )
      }
    }
  }
    , [wasRegistrationFailed, isRegistered, didPageLoadNewly])


  if (isLoggedIn || (!didPageLoadNewly && isRegistered)) {
    return <Redirect push to={"/login"} />
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
                  icon="user"
                  iconPosition="right"
                  placeholder="نام کاربری"
                  className="persian-input"
                  value={username}
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <Form.Input
                  name="password_confirmation"
                  required
                  fluid
                  icon="lock"
                  iconPosition="right"
                  placeholder="تکرار رمز عبور"
                  type="password"
                  className="persian-input"
                  onChange={confirmPassword}
                />

                <Form.Input
                  name="firstName"
                  required
                  fluid
                  icon="user" //todo
                  iconPosition="right"
                  placeholder="نام"
                  type="name"
                  className="persian-input"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />

                <Form.Input
                  name="lastName"
                  required
                  fluid
                  icon="user" //todo
                  iconPosition="right"
                  placeholder="نام خانوادگی"
                  type="name"
                  className="persian-input"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />

                <Form.Input
                  name="phoneNumber"
                  required
                  fluid
                  icon="phone"
                  iconPosition="right"
                  placeholder="شماره موبایل"
                  type="phone" //todo:
                  className="persian-input"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />

                <Form.Input
                  name="email"
                  required
                  fluid
                  icon="mail"
                  iconPosition="right"
                  placeholder="ایمیل"
                  type="mail" //todo  
                  className="persian-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

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
  isLoggedIn: state.account.isLoggedIn,
  wasRegistrationFailed: state.account.wasRegistrationFailed,
})

export default connect(mapStateToProps, {
  register,
  setPrompt,
})(Registration)