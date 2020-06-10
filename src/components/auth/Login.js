import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      form_error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit(event) {
    const { email, password } = this.state;

    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      );
          if (response.data.logged_in) {
            this.props.handleLogin(response.data);
          }
    } catch (error) {
          console.log('login error', error);
          this.setState({
            form_error: {
              title: 'ای بابا!',
              message: 'یکم وقت دیگه دوباره تلاش کن...',
            },
          });
        }

    event.preventDefault();
  }

  render() {
    return (
      <Grid
        centered
        container
        doubling
        stackable

      >
        <Grid.Column
          style={{ textAlign: 'center', direction: 'rtl' }}
          width={6}
        >
          <Header as="h2" textAlign="center">
            ورود
          </Header>
          <Segment>
            <Form
              size="large"
              onSubmit={this.handleSubmit}
              error={!!this.state.form_error}
            >
              <Form.Input
                name="email"
                type="email"
                required
                fluid
                icon="user"
                iconPosition="left"
                placeholder="ایمیل"
                value={this.state.email}
                onChange={this.handleChange}
              />

              <Form.Input
                name="password"
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="رمز عبور"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <Message
                error
                header={this.state.form_error.title}
                content={this.state.form_error.message}
              />

              <Button color="blue" fluid size="large">
                بزن بریم
              </Button>
            </Form>
          </Segment>
          <Message>
            هنوز ثبت‌نام نکردی؟ <Link to="/registration">ثبت‌نام کن!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
