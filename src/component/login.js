import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      greeting: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/users/login')
        .then(result => this.setState({greeting: result.data.sayHi}))
  }
  render(){
    return(
      <div>
        <h2>Login</h2>
        <p>{this.state.greeting}</p>
      </div>
      
    )
  }
}
export default Login;