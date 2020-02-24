import React, {useEffect, useState} from 'react';
import { Typography , Card, CardContent } from '@material-ui/core';
import axios from 'axios';

export default function Userlist() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    axios.get('/users/userslist')
    .then(response => {
      setUsers(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])
  return(
    <div className='container'>
      <h2>Users</h2>
      {users.length > 0 &&
        <div className='row'>
          {users.map((user, index)=>(
            <div className='col-md-4' key={index}>
              <Card style={{ width: "300px", height:"400px"}} className="mt-4">
                <CardContent>
                  <Typography>{user.fullname}</Typography>
                  <Typography>{user.email}</Typography>
                  <Typography>{user.phone}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
      }
    </div>
  )
}