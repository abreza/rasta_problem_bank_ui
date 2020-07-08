import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const leftItems = () => [];

const rightItems = (config) => {
  const Items = [];
  if (!config.loggedIn) {
    Items.push(
      <Menu.Item name="login">
        <Button as={Link} to="/login" primary>
          ورود
        </Button>
      </Menu.Item>,
      <Menu.Item name="register">
        <Button as={Link} to="/registration" positive>
          ثبت‌نام
        </Button>
      </Menu.Item>
    );
  }
  return Items;
};

export default function (config) {
  return {
    leftItems: leftItems(config),
    rightItems: rightItems(config),
  };
}
