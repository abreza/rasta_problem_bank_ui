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
import { register } from '../redux/actions/account';
import { connect } from 'react-redux';



class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      formErrorTitle: '',
      formErrorMessage: '',
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
  async handleSubmit(event) {
    const { username, password, firstName, lastName, phoneNumber, email } = this.state;
    this.props.register(username, password, firstName, lastName, phoneNumber, email);
    event.preventDefault();
  }

  render() {
    return (
      <Grid centered doubling container stackable>
        <Grid.Column
          style={{ textAlign: 'center', direction: 'rtl' }}
          width={6}
        >
          <Header as="h2" textAlign="center">
            ثبت‌نام
          </Header>
          <Segment>
            <Form
              size="large"
              onSubmit={this.handleSubmit}
              error={!!this.state.form_error}
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
                value={this.state.username}
                onChange={this.handleChange}
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
                value={this.state.password}
                onChange={this.handleChange}
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
                value={this.state.password_confirmation}
                onChange={this.confirmPassword}
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
                value={this.state.firstName}
                onChange={this.handleChange}
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
                value={this.state.lastName}
                onChange={this.handleChange}
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
                value={this.state.phoneNumber}
                onChange={this.handleChange}
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
                value={this.state.email}
                onChange={this.handleChange}
              />

              <Message
                error
                header={this.state.formErrorTitle}
                content={this.state.formErrorMessage}
              />
              <Button type="submit" color="blue" fluid size="large">
                ثبت‌نام
              </Button>
            </Form>
          </Segment>
          <Message>
            قبلاً ثبت‌نام کردی؟ <Link to="/login">وارد شو!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStatoToProps = (state) => {

}

export default connect(mapStatoToProps, {
  register,
})(Registration)