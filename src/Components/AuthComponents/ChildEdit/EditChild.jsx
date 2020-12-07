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
import ChildIndex from './ChildIndex';

export default class EditChild extends React.Component{
     constructor(props){
          super(props)

          this.turnEditOff = this.turnEditOff.bind(this);
          this.submitNewChildData = this.submitNewChildData.bind(this);
          this.turnEditOn = this.turnEditOn.bind(this);
          this.turnEditOff = this.turnEditOff.bind(this);
          this.editChild = this.editChild.bind(this);
          this.deleteChild = this.deleteChild.bind(this);

         this.state = {
         childList: [],
         editModalOn: false,

         childNameToEdit: '',
         dobToEdit: '',
         weightToEdit: '',
         lengthToEdit: '',
         idToEdit: '',
         }
     }

     turnEditOn(){
          this.setState({editModalOn:true});
     }
     turnEditOff(){
          this.setState({editModalOn:false});
     }

     deleteChild(child){
          fetch(`https://jdi-babystats.herokuapp.com/child/${child.id}`, {
          // fetch(`http://localhost:3030/foodlog/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               console.log(res.json())
          }).then(()=>{
               this.setState({
                    childNameToEdit: '',
                    dobToEdit: '',
                    weightToEdit: '',
                    lengthToEdit: '',
                    idToEdit: '',
               });
          }).then(()=>{
               this.getChildren();
          })
     }

     editChild(child){
          this.turnEditOn();
          this.setState({
               childNameToEdit: child.name,
               dobToEdit: child.dob,
               weightToEdit: child.birth_weight,
               lengthToEdit: child.birth_length,
               idToEdit: child.id
          })
     }

     submitNewChildData(e){
          e.preventDefault();
          fetch(`https://jdi-babystats.herokuapp.com/child/${this.state.idToEdit}`, {
               method: 'PUT',
               body: JSON.stringify({
                    child: {
                         name: this.state.childNameToEdit,
                         dob: this.state.dobToEdit,
                         birth_weight: this.state.weightToEdit,
                         birth_length: this.state.lengthToEdit
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
                    childNameToEdit: '',
                    dobToEdit: '',
                    weightToEdit: '',
                    lengthToEdit: '',
                    idToEdit: '',
               });
               this.getChildren();
          }).catch((err) => {
               console.log(err);
          })
     }

     getChildren(){
          fetch('https://jdi-babystats.herokuapp.com/child/', {
               method: 'GET',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((userData) => {
               this.setState({childList: userData});
          })
     }

     componentDidMount(){
          this.getChildren();
     }

     render(){
          return(
               <Container>
                    <Row>
                         <ChildIndex childList={this.state.childList} deleteChild={this.deleteChild} editChild={this.editChild} />
                    </Row>
                    <Modal isOpen={this.state.editModalOn} toggle={this.turnEditOff}>
                         <ModalBody>
                              <ModalHeader>Edit Child</ModalHeader>
                              <Form onSubmit={this.submitNewChildData}>
                                   <FormGroup>
                                        {/* name */}

                                        <Label for="name">Name</Label>
                                        <Input
                                             type="text"
                                             placeholder={this.state.childNameToEdit}
                                             onChange={(e) => this.setState({childNameToEdit: e.target.value})}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* DOB */}

                                        <Label for="dob">Date of Birth:</Label>
                                        <Input
                                             type="date"
                                             placeholder={this.state.dobToEdit}
                                             onChange={(e) => this.setState({dob: e.target.value})}
                                             />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* weight */}

                                        <Label for="weight">Birth Weight (oz):</Label>
                                        <Input
                                             type="number"
                                             placeholder={this.state.weightToEdit}
                                             onChange={(e) => this.setState({weightToEdit: e.target.value})}
                                             />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* length */}

                                        <Label for="length">Birth Length (inches):</Label>
                                        <Input for="length"
                                             type="number"
                                             placeholder={this.state.lengthToEdit}
                                             onChange={(e) => this.setState({lengthToEdit: e.target.value})}
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