import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import axios from 'axios';

class Userlist extends Component {
  constructor(props){
    super(props);
    this.state= {
      users:[]
    };
  }
  componentDidMount(){
    axios.get('/users/userslist')
    .then(response => {
      this.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  render(){
    const {users} = this.state;
    return(
      <MDBContainer>
        <h2>Users</h2>
        <MDBRow>
          {users.map((user, index)=>(
            <MDBCol md='4' key={index}>
              <MDBCard style={{ width: "300px", height:"400px"}} className="mt-4">
                <MDBCardBody>
                  <MDBCardTitle>{user.fullname}</MDBCardTitle>
                  <MDBCardText>{user.email}</MDBCardText>
                  <MDBCardText>{user.phone}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    )
  }
}
export default Userlist;