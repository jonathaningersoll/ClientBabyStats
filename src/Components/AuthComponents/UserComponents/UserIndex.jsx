import React from 'react';
import {
     Table,
     Button,
} from 'reactstrap';

export default class UserIndex extends React.Component{
     constructor(props){
          super(props)
          
          this.displayUsers = this.displayUsers.bind(this);
     }

     displayUsers(){
          return(
               !this.props.users
               ?<></>
               :this.props.users.map((user, index) => (
                    <>
                         <tr key={index}>
                              <th scope="row">{user.id}</th>
                              <td>{user.username}</td>
                              <td>{user.role}</td>
                              <td>{user.email}</td>
                              <td>
                                   <Button color="warning" onClick={() => {this.props.editUser(user); console.log("x");}}>Update</Button>
                                   <Button color="danger" onClick={() => {this.props.stageDelete(user)}}>Delete</Button>
                              </td>
                         </tr>
                    </>
               ))
          )
     }

     render(){
          return(
               <>
               <Table striped>
                    <thead>
                         <tr>
                              <th>User ID</th>
                              <th>Username</th>
                              <th>User Role</th>
                              <th>Email</th>
                              <th>Options</th>
                         </tr>
                    </thead>
                    <tbody>
                         {this.displayUsers()}
                    </tbody>
               </Table>
               </>
          )
     }
}