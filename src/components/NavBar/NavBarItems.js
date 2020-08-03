import React from 'react';
import { Label, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const leftItems = () => [];

const rightItems = (config) => {
  const Items = [];
  if (!config.isLoggedIn) {
    Items.push(
      <Menu.Item name="message">
        <Label style={{ direction: 'rtl' }}>
          شما هنوز وارد نشدید!
        </Label>
      </Menu.Item>,
      <Menu.Item name="login">
        <Button as={Link} to="/login" primary>
          ورود
        </Button>
      </Menu.Item>,
      <Menu.Item name="register">
        <Button as={Link} to="/registration" positive>
          ثبت‌نام
        </Button>
      </Menu.Item>,
    );
  } else {
    Items.push(
      <Menu.Item name="message">
        <Label style={{ direction: 'rtl' }}>
          {config.username}ی عزیز، خوش اومدی!
        </Label>
      </Menu.Item>,
      <Menu.Item name="logout">
        <Button as={Link} to="/" onClick={config.logout} primary>
          خروج
        </Button>
      </Menu.Item>,
    );
  }
  return Items;
};

export default function navbarItems(config) {
  return {
    leftItems: leftItems(config),
    rightItems: rightItems(config),
  };
}