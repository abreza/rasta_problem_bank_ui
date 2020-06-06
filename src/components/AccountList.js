import React, { Component } from 'react';
import {
  Grid,
  List,
  Header,
  Message,
  Segment,
  Label,
  Divider,
  Statistic,
  Item,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AccountDisplay extends React.Component {
  render() {
    const staticName = this.props.isItMe ?
      <b>{this.props.account.firstName} {this.props.account.lastName}</b> :
      <span>{this.props.account.firstName} {this.props.account.lastName}</span>;
    const itemStyle = this.props.isItMe ?
      { position: "relative", backgroundColor: "rgb(200, 200, 200)", padding: "7px", borderRadius: "0px 0px 10px 10px" } :
      { position: "relative", padding: "7px" };
    const labelColor = this.props.rate === 1 ? "yellow" :
      this.props.rate === 2 ? "grey" :
        this.props.rate === 3 ? "brown" :
          "white";

    return (
      <Item style={itemStyle}>
        <Label style={{ marginRight: "10px" }} color={labelColor}>{this.props.rate}</Label>
        {staticName}
        <span style={{ position: "absolute", right: "7%", top: "25%" }}>{this.props.account.numberOfAdds}</span>
      </Item>
    );
  }
}
export default class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: {
        firstName: "ali",
        lastName: 're',
        numberOfAdds: 5,
        username: 'fdfsd',
      },
      accounts: [
        {
          account: {
            firstName: "ali",
            lastName: 're',
            numberOfAdds: 10,
            username: 'fdfsd',
          }
        },
        {
          account: {
            firstName: "li",
            lastName: 'rea',
            numberOfAdds: 2,
            username: 'fdd',
          }
        },
        {
          account: {
            firstName: "ali",
            lastName: 'rea',
            numberOfAdds: 20,
            username: 'fad',
          }
        },
        {
          account: {
            firstName: "ali",
            lastName: 'rea',
            numberOfAdds: 20,
            username: 'fad',
          }
        },
      ],
    };
  }
  isItMe(account) {
    return this.state.userAccount ?
      account.username === this.state.userAccount.username :
      false;
  }
  render() {
    sortAccounts(this.state.accounts);
    const accountsItems = this.state.accounts.map((x, rate) => {
      const diver = rate + 1 === this.state.accounts.length ?
        null :
        <Divider ></Divider>;
      return (
        <List.Item>
          <AccountDisplay
            account={x.account}
            rate={rate + 1}
            isItMe={this.isItMe(x.account)}
          />
          {diver}
        </List.Item>
      );
    });
    const loginMassage = this.state.userAccount ?
      null : <Message> <Link to="/login">Login</Link> </Message>;

    return (
      <Grid centered doubling columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Rating
          </Header>
          <Segment>
            <Item style={{
              position: "relative",
              backgroundColor: "rgb(100, 100, 100)",
              borderRadius: "10px 10px 0px 0px",
              paddingBottom: "10px",
              marginBottom: "0",
              padding: "10px"

            }}>
              <Header as="h4" style={{ display: "inline", color: "white" }}>name</Header>
              <Header as="h4" style={{ display: "inline", color: "white", position: "absolute", right: "10px", bottom: "25%" }}>number of adds</Header>

            </Item>
            <Divider style={{
              position: "relative",
              backgroundColor: "rgb(50, 50, 50)",
              marginTop: "0px",

            }}>
            </Divider>

            <List>
              {accountsItems}
            </List>
          </Segment>
          {loginMassage}
        </Grid.Column>
      </Grid>
    );
  }
}

function sortAccounts(accounts) {
  for (let i = 1; i < accounts.length; i++) {
    for (let j = i; j > 0; j--) {
      if (accounts[j].account.numberOfAdds > accounts[j - 1].account.numberOfAdds) {
        let tmp = accounts[j];
        accounts[j] = accounts[j - 1];
        accounts[j - 1] = tmp;
      }
    }
  }
}
