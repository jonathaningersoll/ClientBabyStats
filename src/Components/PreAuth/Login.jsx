import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

export default class Login extends React.Component{
     constructor(props){
          super(props)

          this.auth = this.auth.bind(this);
     }

     auth(e){
          e.preventDefault();
          fetch(`${APIURL}/user/login`,{
          // fetch('http://localhost:3030/user/login',{
               method: 'POST',
               body: JSON.stringify({
                    user:{
                         username: this.state.username,
                         password: this.state.password,
                    }}),
               headers: new Headers({
                    'Content-Type': 'application/json'
               })
          }).then(
               (res) => res.json()
          ).then((data) => {
               this.props.updateToken(data.sessionToken);
               this.props.setRole(data.role);
          })
     }

     render(){
          return(
               <>
                    <h1>Login here!</h1>
                    <Form onSubmit={this.auth}>
                         <FormGroup>
                              <Label htmlFor="username">Username</Label>
                              <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.username} />
                         </FormGroup>
                         <FormGroup>
                              <Label htmlFor="password">Password</Label>
                              <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.password} type="password" />
                         </FormGroup>
                         <Button type="submit">Login</Button>
                    </Form>
               </>
          )
     }
}