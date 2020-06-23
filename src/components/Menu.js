import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const loggedIn = false; //TODO: must swap with "this.props.loggedIn"

const TopMenu = () => (
  <Menu>
    <Container>
      <Menu.Item as={Link} to="/" header>
        <Image size="mini" src={process.env.PUBLIC_URL + '/logo.png'} />
      </Menu.Item>
      <Menu.Menu position="right">

        <Menu.Item as={Link} to="/problemset" name="register">
          سوالات
        </Menu.Item>

        {!loggedIn && (
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/login" name="login">
              ورود
            </Menu.Item>

            <Menu.Item as={Link} to="/registration" name="register">
              ثبت‌نام
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu.Menu>

    </Container>
  </Menu>
);

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
})

export default connect(mapStateToProps)(TopMenu)