import React, { Component } from 'react';
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


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrorTitle: '',
      formErrorMessage: '',
      isPangeNewlyLoaded: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit(event) {
    const { username, password } = this.state;
    this.props.login(username, password);
    this.setState({ isPangeNewlyLoaded: false })
    event.preventDefault();
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect push to={"/"} />;
    }

    const { isFetching, wasLoginFailed } = this.props;
    const { isPangeNewlyLoaded } = this.state;

    return (
      <Container>
        <Grid centered container doubling stackable>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column
              textAlign='center'
              width={6}
            >
              <Header as="h2" textAlign="center">
                ورود
              </Header>

              <Message error style={{ direction: 'rtl' }} hidden={isFetching || !wasLoginFailed || isPangeNewlyLoaded}>
                <Message.Header>نام کاربری یا رمز عبورت اشتباهه</Message.Header>
                <p>یه بار دیگه تلاش کن.</p>
              </Message>

              <Segment>
                <Form
                  size="large"
                  onSubmit={this.handleSubmit}
                  error={!!this.state.form_error}
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
      </Container>
    );
  }
}

const mapStatoToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
  isFetching: state.account.isFetching,
  wasLoginFailed: state.account.wasLoginFailed,
})

export default connect(mapStatoToProps, {
  login,
})(Login)