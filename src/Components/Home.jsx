import React from 'react';
import {
     Row,
     Col,
     Container,
     Dropdown,
     DropdownToggle,
     DropdownMenu,
     DropdownItem,
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
import{
     BrowserRouter,
     Link,
     Route,
     Switch
} from 'react-router-dom';
import MainDashboard from './MainDashboard';
import Details from './AuthComponents/Details';

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
          this.activeChildLinks = this.activeChildLinks.bind(this);
          
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

     createChild(e) {
          e.preventDefault();
          let ncw = (this.state.lbs*16) + this.state.oz;
          let ncl = (this.state.ft*12) + this.state.inches;

          // fetch('url',{init}).then( (response) => {})

          fetch('https://jdi-babystats.herokuapp.com/child', {
          // fetch('http://localhost:3030/child', {
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
               this.modalToggle();
          }    );
     }

     getChild(id){
          fetch(`https://jdi-babystats.herokuapp.com/child/${id}`, {
          // fetch(`http://localhost:3030/child/${id}`, {
               method:'GET',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then((childData) => {
               this.setState({ activeChildData: childData });
          })
     }

     getChildren() {
          fetch('https://jdi-babystats.herokuapp.com/child', {
          // fetch('http://localhost:3030/child', {
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

     activeChildLinks(){
          return(
               <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/details">View Details</Link>
               </>
          )
     }

     render() {
          return (
               <BrowserRouter>
                    <Container>
                         <Row>
                              <Col className="col-3">
                              {/* CHILD SELECTION DROPDOWN MENU */}
                              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                   <DropdownToggle caret className="child-dropdown">
                                        {!this.state.activeChildData.name ? 'Select a child(Home)' : this.state.activeChildData.name}
                                   </DropdownToggle>
                                   <DropdownMenu>
                                        {!this.state.kids ? null : this.kidList()}
                                   </DropdownMenu>
                              </Dropdown>
                              </Col>

                              {/* CREATE NEW CHILD MODAL */}
                              <Col className="col-9">
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
                                   {!this.state.activeChildData.id ? <div></div> : 
                                        <>
                                             
                                             <Link to="/dashboard"><div className="kid-links">Dashboard</div></Link>
                                             <Link to="/details"><div className="kid-links">View Details</div></Link>
                                             
                                        </>
                                   }
                              </Col>
                         </Row>
                    </Container>

                    <Container className="themed-container">
                         <Row>
                              <Switch>
                                   <Route exact path="/dashboard">
                                        <MainDashboard token={this.props.token} activeChild={this.state.activeChildData} />
                                   </Route>
                                   <Route exact path="/details">
                                        <Details token={this.props.token} activeChild={this.state.activeChildData} />
                                   </Route>
                              </Switch>
                         </Row>
                    </Container>
               </BrowserRouter>
          );
     }
}