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

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        'http://localhost:3001/login',
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then(
        (response) => {
          if (response.data.logged_in) {
            this.props.handleLogin(response.data);
          }
        },
        (error) => {
          console.log('login error', error);
          this.setState({
            form_error: {
              title: 'Connection Refused!',
              message: 'Please try again later.',
            },
          });
        }
      );
    event.preventDefault();
  }

  render() {
    return (
      <Grid centered doubling columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
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
                placeholder="Email address"
                value={this.state.email}
                onChange={this.handleChange}
              />

              <Form.Input
                name="password"
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
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
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <Link to="/registration">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
