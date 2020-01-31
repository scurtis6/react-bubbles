import React, { useState } from "react";
import axios from 'axios';
import axiosWithAuth from './utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    console.log(e)
    setState({
      ...state,
      [e.target.name]: e.target.value
  })
  };

  const login = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', state)
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log('err', err))
  }
  return (
    <div className='login'>
       <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}
      <h3>Please Login</h3>
      <form onSubmit={login}>
        <label>
          Username: 
          <input 
          type='text'
          name='username'
          placeholder='Enter username'
          onChange={handleChange}
          value={state.username}
          />
        </label>
        <label>
          Password: 
          <input 
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          value={state.password}
          />
        </label>
        <button type='sumbit'>Log in</button>
      </form>
    </div>
  )
};

export default Login;
