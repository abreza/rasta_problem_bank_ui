import React, { Component } from 'react';
import {
  Grid,
  List,
  Header,
  Message,
  Segment,
  Label,
  Statistic,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AccountDisplay extends React.Component {
    render() {
        const staticName = this.props.isItMe ?
        <Statistic as='h3'>{this.props.account.firstName} {this.props.account.lastName}</Statistic> :
        <Statistic>{this.props.account.firstName} {this.props.account.lastName}</Statistic> ;
                
        return (
            <Segment>
                <Label>{this.props.rate}</Label>
                {staticName}
                <Statistic floated='right'>{this.props.account.numberOfAdds}</Statistic>
            </Segment> 
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
                    numberOfAdds: 5,
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
        ],
    };
  }
  isItMe(account) {
    return this.state.userAccount ?
    account.username === this.state.userAccount.username :
    false ;
  }
  render() {
    sortAccounts(this.state.accounts);
    const accountsItems = this.state.accounts.map((x,rate) => {
        return (
        <List.Item>
            <AccountDisplay
             account={x.account}
             rate={rate+1}
             isItMe = {this.isItMe(x.account)}
             />
        </List.Item>      
        );    
    });
    const loginMassage = this.state.userAccount ?
        null : <Message> <Link to="/login">Login</Link> </Message> ;
        
    return (
      <Grid centered doubling columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Rating
          </Header>
          <Segment>
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
            if(accounts[j].account.numberOfAdds > accounts[j-1].account.numberOfAdds){
                let tmp = accounts[j];
                accounts[j] = accounts[j-1];
                accounts[j-1] = tmp;
            }
        }
    }
  }
  