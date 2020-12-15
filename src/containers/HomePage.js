import React from 'react';
import { Button, Icon, Header, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomepageLayout = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="بانک مسئله"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        color: 'black',
        direction: 'rtl',
        textAlign: 'center',
        marginTop: mobile ? '0.5em' : '2em',
      }}
    />
    <Divider hidden />
    <Button
      primary
      style={{
        direction: 'rtl',
        textAlign: 'center',
        margin: 'auto',
        display: 'table',
      }}
      as={Link}
      to="/problemset/page/1"
    >
      مجموعه‌ی مسئله‌ها
      <Icon name="left arrow" />
    </Button>
    <Button
      color='teal'
      style={{
        direction: 'rtl',
        textAlign: 'center',
        margin: 'auto',
        display: 'table',
      }}
      as={Link}
      to="/makeProblem"
    >
      <Icon name="right arrow" />
      ایجاد مسئله‌ی جدید
    </Button>

  </Container>
);

export default HomepageLayout;
