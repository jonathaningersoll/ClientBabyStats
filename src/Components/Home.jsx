import React from 'react';
import Dashboard from './AuthComponents/Dashboard';
import LogPortal from './AuthComponents/LogPortal';
import {
     Row,
     Dropdown,
     DropdownToggle,
     DropdownMenu,
     DropdownItem,
     Col,
     Button,
     Form,
     FormGroup,
     Input,
     Label,
     Modal,
     ModalHeader,
     ModalBody,
     ModalFooter,
} from 'reactstrap';

// (1) const Home = (props) => {
export default class Home extends React.Component{

     constructor(props){
          super(props);

          this.modalToggle = this.modalToggle.bind(this);
          this.toggle = this.toggle.bind(this);
          this.kidList = this.kidList.bind(this);
          this.createChild = this.createChild.bind(this);
          this.fillChildrenPool = this.fillChildrenPool.bind(this);
          this.getChildren = this.getChildren.bind(this);
          this.getChild = this.getChild.bind(this);
          
          this.state = {
               dropdownOpen: false,
               activeChildData: {},
               kids: [],
               modal: false,
               newChildName: "",
               newChildDob: "",
               lbs: 0,
               oz: 0,
               ft: 0,
               inches: 0,
          }
     }

     modalToggle(){ this.setState({modal: !this.state.modal}) }
     toggle(){ this.setState({dropdownOpen: !this.state.dropdownOpen}); }

     kidList() {
          return(
               this.state.kids.map(child => (
                    <DropdownItem onClick={() => this.getChild(child.id)}>
                         {child.name}
                    </DropdownItem>
               ))
          );
     }

     createChild(e) {                                                      // e parameter is passing an event, what event?
          e.preventDefault();                                              // e could be onChange, onSubmit, onClick, etc...
          let ncw = (this.state.lbs*16) + this.state.oz;
          let ncl = (this.state.ft*12) + this.state.inches;

          // fetch('url',{init}).then( (response) => {})                      // the .thens exist solely to 

          fetch('https://jdi-babystats.herokuapp.com/child', {
               method: 'POST',
               body: JSON.stringify({
                    child: {
                         name: this.state.newChildName,
                         dob: this.state.newChildDob,
                         birth_weight: ncw,
                         birth_length: ncl
                    }
               }),
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then(() => {
               this.newMethod();
          })
          .then(() => {
               this.modalToggle();
          }    );
     }

     getChild(id){
          fetch(`https://jdi-babystats.herokuapp.com/child/${id}`, {
               method:'GET',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((childData) => {
               this.setState({ activeChildData: childData });
               console.log('Home Active child set: ', childData);
          })
     }

     getChildren() {
          fetch('https://jdi-babystats.herokuapp.com/child', {
               method: 'GET',
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((childrenData) => {
               this.fillChildrenPool(childrenData);
          });
     }

     componentDidMount(){
          this.getChildren();
     }

     fillChildrenPool(childrenData){
          this.setState({kids: childrenData});
     }

     render() {
          return (
               <>
                    <Row className="col-4">

                    {/* CHILD SELECTION DROPDOWN MENU */}
                         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle caret>
                                   {!this.state.activeChildData.name ? 'Select a child(Home)' : this.state.activeChildData.name}
                              </DropdownToggle>
                              <DropdownMenu>
                                   {this.kidList()}
                              </DropdownMenu>
                         </Dropdown>

                    {/* CREATE NEW CHILD MODAL */}
                         <Button onClick={this.modalToggle}>Add Child</Button>
                         <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                              <ModalHeader toggle={this.modalToggle}>Modal title</ModalHeader>
                              <ModalBody>

                         {/* CREATE NEW CHILD FORM */}
                                   <Form onSubmit={this.createChild}>
                                        <FormGroup>
                                             <Label htmlFor="newchildname">Name:</Label>
                                             <Input
                                                  name="newchildname"
                                                  placeholder="Name"
                                                  onChange={(e) => this.setState({newChildName: e.target.value})}/>
                                        </FormGroup>
                                        <FormGroup>
                                             <Label htmlFor="newchilddob">Date of Birth:</Label>
                                             <Input
                                                  type="date"
                                                  name="date"
                                                  id="exampleDate"
                                                  placeholder="date placeholder"
                                                  onChange={(e) => this.setState({newChildDob: e.target.value})}
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label htmlFor="newchildbirthweightlbs">Birth Weight:</Label>
                                             <Row>
                                                  <Input
                                                       type="number"
                                                       name="number"
                                                       id="exampleNumber"
                                                       placeholder="lbs"
                                                       onChange={(e) => this.setState({lbs: e.target.value})}
                                                  />lbs
                                             </Row>
                                             <Row>
                                                  <Input
                                                       type="number"
                                                       name="number"
                                                       id="exampleNumber"
                                                       placeholder="oz"
                                                       onChange={(e) => this.setState({oz: e.target.value})}
                                                  />oz
                                             </Row>
                                        </FormGroup>
                                        <FormGroup>
                                             <Label htmlFor="newchildbirthlengthft">Birth Length:</Label>
                                             <Row>
                                                  <Input
                                                       type="number"
                                                       name="number"
                                                       id="exampleNumber"
                                                       placeholder="ft"
                                                       onChange={(e) => this.setState({ft: e.target.value})}
                                                  />feet
                                             </Row>
                                             <Row>
                                                  <Input
                                                       type="number"
                                                       name="number"
                                                       id="exampleNumber"
                                                       placeholder="inches"
                                                       onChange={(e) => this.setState({inches: e.target.value})}
                                                  />inches
                                             </Row>
                                        </FormGroup>
                                        <ModalFooter>
                                             <Button type="submit" color="primary">Add Child</Button>
                                             <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                                        </ModalFooter>
                                   </Form>

                              </ModalBody>
                         </Modal>
                    </Row>

                    <Row>
                         <Col className="dashboard">
                              <Dashboard token={this.props.token} activeChild={this.state.activeChildData}/>
                         </Col>

                         <Col className="portal-tiles">
                              <LogPortal token={this.props.token} id={this.state.activeChildData.id}/>
                         </Col>
                    </Row>
               </>
          );
     }
}