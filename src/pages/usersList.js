import React, {useEffect, useState} from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import axios from 'axios';

export default function Userlist() {
  const [userss, setUsers] = useState({
    users:[]
  });
  useEffect(()=>{
    axios.get('/users/userslist')
    .then(response => {
      setUsers({
        users: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])
  const {users} = userss;
  return(
    <MDBContainer>
      <h2>Users</h2>
      {users.length > 0 &&
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
      }
    </MDBContainer>
  )
}