import React from 'react';
import { useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

function Login(props) {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const auth = (e) => {
          e.preventDefault();
          fetch('https://jdi-babystats.herokuapp.com/user/login',{
          // fetch('http://localhost:3030/user/login',{
               method: 'POST',
               body: JSON.stringify({
                    user:{
                         username: username,
                         password: password,
                    }}),
               headers: new Headers({
                    'Content-Type': 'application/json'
               })
          }).then(
               (res) => res.json()
          ).then((data) => {
               console.log(data);
               props.updateToken(data.sessionToken);
               props.setRole(data.role);
          })
     }

     return(
          <>
               <h1>Login here!</h1>
               <Form onSubmit={auth}>
                    <FormGroup>
                         <Label htmlFor="username">Username</Label>
                         <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} />
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="password">Password</Label>
                         <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" />
                    </FormGroup>
                    <Button type="submit">Login</Button>
               </Form>
          </>
     )
}

export default Login;