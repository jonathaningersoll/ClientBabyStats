import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

export default class Register extends React.Component{
     constructor(props){
          super(props)

          this.reg = this.reg.bind(this);

          this.state = {
               username: '',
               password: '',
               email: '',
               role: 'User'
          }

     }

     reg(e){
          e.preventDefault();
          fetch(`${APIURL}/user/register`, {
               // fetch("http://localhost:3030/user/register", {
               method: 'POST',
               body: JSON.stringify({
                    user:{
                         username: this.state.username,
                         password: this.state.password,
                         email: this.state.email,
                         role: this.state.role
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json'
               })
          }).then(
               (res) => res.json()
          ).then((data) => {
               this.props.updateToken(data.sessionToken)
          })
     }

     render(){
          return(
               <>
                    <h1>Registration</h1>
                    <Form onSubmit={this.reg}>
                         <FormGroup>
                              <Label htmlFor="username">Username</Label>
                              <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.username} />
                         </FormGroup>
                         <FormGroup>
                              <Label htmlFor="password">Password</Label>
                              <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.password} type="password" />
                         </FormGroup>
                         <FormGroup>
                              <Label htmlFor="password">Email Address</Label>
                              <Input onChange={(e) => this.setState({email: e.target.value})} name="email" value={this.email} type="email" />
                         </FormGroup>
                         <Button type="submit">Register</Button>
                    </Form>
               </>
          )
     }
}