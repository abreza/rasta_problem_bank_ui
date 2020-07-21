import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { login } from '../redux/actions/account';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrorTitle: '',
      formErrorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit(event) {
    const { username, password } = this.state;
    this.props.login(username, password);
    event.preventDefault();
  }

  render() {
    return (
      <Grid centered container doubling stackable>
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
                name="username"
                required
                fluid
                icon="user"
                iconPosition="left"
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
                iconPosition="left"
                placeholder="رمز عبور"
                type="password"
                className="persian-input"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <Message
                error
                header={this.state.formErrorTitle}
                content={this.state.formErrorMessage}
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

const mapStatoToProps = (state) => { //TODO:
  const thisUser = state.thisUser;
  const userType = thisUser ? thisUser.type : null;
  return ({
    activePage: state.problemSetPageActivePage,
    totalPages: state.problemSetPageTotalPages,
    questionsShortInfo: state.questionsShortInfo,
    userType,
  })
}

export default connect(mapStatoToProps, {
  login,
})(Login)