import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => (
  <Menu>
    <Container>
      <Menu.Item as={Link} to="/" header>
        <Image size="mini" src={process.env.PUBLIC_URL + '/logo.png'} />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login" name="login">
          ورود
        </Menu.Item>

        <Menu.Item as={Link} to="/registration" name="register">
          ثبت‌نام
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);
