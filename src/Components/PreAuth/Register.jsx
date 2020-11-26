import React from 'react';
import { useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

function Register(props) {

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');
     const [role] = useState('User');

     const reg = (event) => {
          event.preventDefault();
          fetch("https://jdi-babystats.herokuapp.com/user/register", {
               // fetch("http://localhost:3030/user/register", {
               method: 'POST',
               body: JSON.stringify({
                    user:{
                         username: username,
                         password: password,
                         email: email,
                         role: role
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json'
               })
          }).then(
               (res) => res.json()
          ).then((data) => {
               props.updateToken(data.sessionToken)
          })
     }

     return(
          
          <>
               <h1>Registration</h1>
               <Form onSubmit={reg}>
                    <FormGroup>
                         <Label htmlFor="username">Username</Label>
                         <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} />
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="password">Password</Label>
                         <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" />
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="password">Email Address</Label>
                         <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email" />
                    </FormGroup>
                    <Button type="submit">Register</Button>
               </Form>
          </>
     )
}

export default Register