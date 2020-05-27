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

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      form_error: '',
    };

    this.confirmPassword = this.confirmPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  confirmPassword(e) {
    let elem = e.target;
    if (this.state.password !== elem.value) {
      elem.setCustomValidity("Passwords Don't Match");
    } else {
      elem.setCustomValidity('');
    }
  }
  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        'http://localhost:3001/registrations',
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
          if (response.data.status === 'created') {
            this.props.handleLogin(response.data);
          }
        },
        (error) => {
          console.log("registration error", error);
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
            Register
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

              <Form.Input
                name="password_confirmation"
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                value={this.state.password_confirmation}
                onChange={this.confirmPassword}
              />

              <Message
                error
                header={this.state.form_error.title}
                content={this.state.form_error.message}
              />
              <Button type="submit" color="blue" fluid size="large">
                Register
              </Button>
            </Form>
          </Segment>
          <Message>
            Already signed up? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
