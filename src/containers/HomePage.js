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
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Divider hidden />
    <Button
      primary
      size="huge"
      style={{
        direction: 'rtl',
        textAlign: 'center',
        margin: 'auto',
        display: 'table',
      }}
      as={Link}
      to="/problemset/page/1"
    >
      بزن بریم!
      <Icon name="left arrow" />
    </Button>
  </Container>
);

export default HomepageLayout;
