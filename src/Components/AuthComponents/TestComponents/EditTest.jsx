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
import TestIndex from './TestIndex';
import APIURL from '../../helpers/environment';

// This test doesn't work because I do not have a GET all endpoint for my logs. I'm passing the child prop expecting
// to have to use the child.id to get that child's foodlogs, but I can't use it.

export default class EditTest extends React.Component{
     constructor(props){
          super(props)

          this.turnEditOff = this.turnEditOff.bind(this);
          this.submitNewLogData = this.submitNewLogData.bind(this);
          this.turnEditOn = this.turnEditOn.bind(this);
          this.turnEditOff = this.turnEditOff.bind(this);
          this.editLog = this.editLog.bind(this);
          this.deleteLog = this.deleteLog.bind(this);

         this.state = {
         logList: [],
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

     deleteLog(log){
          fetch(`${APIURL}/child/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               console.log(res.json())
          }).then(()=>{
               this.setState({
                    mealTimeToEdit: '',
                    breastToEdit: '',
                    bottleToEdit: '',
                    solidToEdit: '',
                    idToEdit: '',
               });
          }).then(()=>{
               this.getLogs();
          })
     }

     editLog(log){
          this.turnEditOn();
          this.setState({
               mealTimeToEdit: log.time_fed,
               breastToEdit: log.breast,
               bottleToEdit: log.bottle,
               solidToEdit: log.solid,
               idToEdit: log.id
          })
     }

     submitNewLogData(e){
          e.preventDefault();
          fetch(`${APIURL}/child/${this.state.idToEdit}`, {
               method: 'PUT',
               body: JSON.stringify({
                    foodlog: {
                         time_fed: this.state.mealTimeToEdit,
                         breast: this.state.breastToEdit,
                         bottle: this.state.bottleToEdit,
                         solid: this.state.solidToEdit
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
                    mealTimeToEdit: '',
                    breastToEdit: '',
                    bottleToEdit: '',
                    solidToEdit: '',
                    idToEdit: '',
               });
               this.getChildren();
          }).catch((err) => {
               console.log(err);
          })
     }

     // this.setState({
     //      mealTimeToEdit: this.props.child.foodlog.time_fed,
     //      breastToEdit: this.props.child.foodlog.breast,
     //      bottleToEdit: this.props.child.foodlog.bottle,
     //      solidToEdit: this.props.child.foodlog.solid,
     //      idToEdit: this.props.child.foodlog.id
     // })

     getLogs(id){
          console.log('getLogs rendered')
          fetch(`${APIURL}/child/${id}`, {
               method: 'GET',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((child) => {
               this.setState({logList: child.foodlogs});
          })
          .then(() => {
               <TestIndex logList={this.state.logList} deleteLog={this.deleteLog} editLog={this.editLog} />
          })
     }

     render(){
          return(
               <Container>
                    <Row>
                         {console.log('EditTest rendered')}
                         {this.getLogs(this.props.child.id)}
                    </Row>
                    <Modal isOpen={this.state.editModalOn} toggle={this.turnEditOff}>
                         <ModalBody>
                              <ModalHeader>Edit Meal</ModalHeader>
                              <Form onSubmit={this.submitNewLogData}>
                                   <FormGroup>
                                        {/* Meal Time */}

                                        <Label for="mealtime">Meal Time</Label>
                                        <Input
                                             type="date"
                                             placeholder={this.state.mealTimeToEdit}
                                             onChange={(e) => this.setState({mealTimeToEdit: e.target.value})}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* Breast */}

                                        <Label for="breast">Breast:</Label>
                                        <Input
                                             type="check"
                                             placeholder={this.state.breastToEdit}
                                             onChange={(e) => this.setState({breastToEdit: e.target.value})}
                                             />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* Bottle */}

                                        <Label for="weight">Bottle (oz):</Label>
                                        <Input
                                             type="number"
                                             placeholder={this.state.bottleToEdit}
                                             onChange={(e) => this.setState({bottleToEdit: e.target.value})}
                                             />
                                   </FormGroup>
                                   <FormGroup>
                                        {/* Solid */}

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