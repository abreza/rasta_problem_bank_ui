// import React, { Component } from 'react';
// import {
//   Grid,
//   Header,
//   Segment,
//   Divider,
//   Label,
//   Table,
//   Pagination,
// } from 'semantic-ui-react';

// import { Redirect } from 'react-router';
// import { connect } from 'react-redux';


// const users = [
//   {
//     isLoggedIn: false,
//     name: 'Mamadreza Kiani',
//     username: 'MAMAD_KIA',
//     type: 'ADDER',
//     numberOfAddedQuestions: 2,
//     lastSeen: '99/4/19',
//   },
//   {
//     isLoggedIn: true,
//     name: 'Alireza HAshemi',
//     username: 'AmooHashem',
//     type: 'MENTOR',
//     numberOfAddedQuestions: 9,
//     lastSeen: '99/4/19',
//   },
// ]


// class UsersRating extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePage: 1,
//       totalPages: 10,
//       users: users, //TODO: should be "this.props.questions"
//       thisUser: this.props.thisUser,
//       redirect: false,
//     };
//   }

//   handlePaginationChange = (e, { activePage }) => {
//     this.setState({ activePage: activePage, redirect: true })
//   }

//   render() {
//     const { users: data } = this.state

//     if (this.state.redirect) {
//       return <Redirect push to={"/usersrating/page/" + this.state.activePage} />;
//     }

//     return (
//       <Grid
//         centered
//         container
//         stackable
//         doubling
//         style={{ direction: 'rtl' }}
//       >
//         <Grid.Row centered relaxed>
//           <Header as="h1" textAlign="center">
//             کاربران
//           </Header>
//         </Grid.Row>
//         <Grid.Row columns={2}>

//           <Grid.Column width={11}>
//             <Segment>
//               <Label color='teal' ribbon='right'>
//                 صفحه‌ی {this.state.activePage} از {this.state.totalPages}
//               </Label>
//               <Table
//                 striped
//                 fixed
//                 textAlign='center'
//               >
//                 <Table.Header>
//                   <Table.Row>
//                     <Table.HeaderCell
//                       width={1}
//                     >
//                       رتبه
//                     </Table.HeaderCell>
//                     <Table.HeaderCell
//                       width={3}
//                     >
//                       نام
//                     </Table.HeaderCell>
//                     <Table.HeaderCell
//                       width={2}
//                     >
//                       نقش
//                     </Table.HeaderCell>
//                     <Table.HeaderCell
//                       width={5}
//                     >
//                       تعداد سوالات افزوده
//                     </Table.HeaderCell>
//                   </Table.Row>
//                 </Table.Header>

//                 <Table.Body>
//                   {data.map(({ name, numberOfAddedQuestions, type, username }, index) => (
//                     <Table.Row key={index} active={this.state.thisUser ? (this.state.thisUser.name === name ? true : false) : false}>
//                       <Table.Cell >{index + 1}</Table.Cell>
//                       <Table.Cell selectable>
//                         <a href={'/users/' + username}>{name}</a>
//                       </Table.Cell>
//                       <Table.Cell>{type}</Table.Cell>
//                       <Table.Cell>{numberOfAddedQuestions}</Table.Cell>
//                     </Table.Row>
//                   ))}
//                 </Table.Body>
//               </Table>
//               <div
//                 style={{
//                   textAlign: 'center',
//                 }}
//               >
//                 <Pagination
//                   activePage={this.state.activePage}
//                   onPageChange={this.handlePaginationChange}
//                   totalPages={this.state.totalPages}
//                 />
//               </div>
//             </Segment>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid >
//     );
//   }
// }

// const mapStatoToProps = (state) => ({
//   activePage: state.UsersRatingPageActivePage,
//   totalPages: state.UsersRatingPageTotalPages,
//   users: state.users,
//   thisUser: state.thisUser,
// })

// export default connect(mapStatoToProps)(UsersRating)