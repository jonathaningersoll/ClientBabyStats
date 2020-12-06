import React from 'react';
import {
     Container,
     Row,
     Modal,
     ModalBody,
     ModalFooter,
     Button,
     Form,
     FormGroup,
     Label,
     Input,
     ModalHeader
} from 'reactstrap';
import UserIndex from './UserComponents/UserIndex';

export default class Admin extends React.Component{
     constructor(props){
          super(props)

          this.deleteUser = this.deleteUser.bind(this);
          this.editUser = this.editUser.bind(this);
          this.turnEditOn = this.turnEditOn.bind(this);
          this.turnEditOff = this.turnEditOff.bind(this);
          this.submitNewUserData = this.submitNewUserData.bind(this);

          this.state = {
               users: [],
               editModalOn: false,
               
               emailToEdit: '',
               usernameToEdit: '',
               idToEdit: ''
          }
     }

     turnEditOn(){
          this.setState({editModalOn: true});
     }

     turnEditOff(){
          this.setState({editModalOn: false});
     }

     deleteUser(user){
          console.log(user, "has been deleted");
     }

     editUser(user){
          this.turnEditOn();
          this.setState({
               emailToEdit: user.email,
               usernameToEdit: user.username,
               // passwordToEdit: user.passwordhash,
               roleToEdit: user.role,
               idToEdit: user.id
          })
     }

     submitNewUserData(e){
          e.preventDefault();
          fetch(`https://jdi-babystats.herokuapp.com/user/update/${this.state.idToEdit}`, {
               method: 'PUT',
               body: JSON.stringify({
                    user: {
                         username: this.state.usernameToEdit,
                         // passwordhash: this.state.passwordToEdit,
                         email: this.state.emailToEdit,
                         role: this.state.roleToEdit
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               res.json();
          }).then(()=>{
               this.turnEditOff();
          }).then(()=>{
               this.setState({
                    emailToEdit: '',
                    usernameToEdit: '',
                    idToEdit: ''
               });
               this.getUsers();
          }).catch((err) => {
               console.log(err);
          })
     }

     getUsers(){
          fetch('https://jdi-babystats.herokuapp.com/user/', {
               method: 'GET',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((userData) => {
               this.setState({users: userData});
          })
     }

     componentDidMount(){
          this.getUsers();
     }

     render(){
          return(
               <Container>
                    <Row>
                         <UserIndex users={this.state.users} deleteUser={this.deleteUser} editUser={this.editUser}/>
                    </Row>
                    {/* EDIT MODAL */}
                    <Modal isOpen={this.state.editModalOn} toggle={this.turnEditOff}>
                         <ModalBody>
                              <ModalHeader>Edit User</ModalHeader>
                              <Form onSubmit={this.submitNewUserData}>
                                   <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                             type="text"
                                             placeholder={this.state.emailToEdit}
                                             onChange={(e) => this.setState({emailToEdit: e.target.value})}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                             type="text"
                                             placeholder={this.state.usernameToEdit}
                                             onChange={(e) => this.setState({usernameToEdit: e.target.value})}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="role">Role</Label>
                                        <Input
                                             type="text"
                                             placeholder={this.state.roleToEdit}
                                             onChange={(e) => this.setState({roleToEdit: e.target.value})}
                                        />
                                   </FormGroup>
                                   <ModalFooter>
                                        <Button color="primary" type="submit">OK</Button>
                                        <Button color="secondary" onClick={this.turnEditOff}>Cancel</Button>
                                   </ModalFooter>
                              </Form>
                         </ModalBody>
                    </Modal>
               </Container>

          )
     }
}