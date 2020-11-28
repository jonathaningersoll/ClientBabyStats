import React, { useState, useEffect } from 'react';
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

const Home = (props) => {

     const [   dropdownOpen, setDropdownOpen      ] = useState(false);
     const [   activeChildData, setActiveChildData] = useState(['Select a child']);
     const [   kids, setKids                      ] = useState([]);
     const [   modal, setModal                    ] = useState(false);
     const [   newChildName, setNewChildName      ] = useState('');
     const [   newChildDob, setNewChildDob        ] = useState('');
     const [   lbs, setLbs                        ] = useState('0');
     const [   oz, setOz                          ] = useState('0');
     const [   ft, setFt                          ] = useState('0');
     const [   inches, setIn                      ] = useState('0');

     const modalToggle =() => setModal(!modal);
     const toggle = () => setDropdownOpen(prevState => !prevState);

     const kidList = () => {
          return(kids.map(child => (
               <DropdownItem onClick={() => /* index number of the child? */ setActiveChildData(child)}>
                    {child.name}
               </DropdownItem>)
          ))
     }

     const fetchChildren = () => {
          fetch('https://jdi-babystats.herokuapp.com/child', {
               method: 'GET',
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
               })
          }).then( (res) => res.json())
          .then((childrenData) => {
               setKids(childrenData);
          });
     }

     const createChild = (e) => {
          e.preventDefault();
          let ncw = (lbs*16) + oz;
          let ncl = (ft*12) + inches;
          fetch('https://jdi-babystats.herokuapp.com/child', {
               
               method: 'POST',
               body: JSON.stringify({
                    child: {
                         name: newChildName,
                         dob: newChildDob,
                         birth_weight: ncw,
                         birth_length: ncl
                    }
               }),
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
               })
          }).then( (res) => res.json())
          .then((childData) => {
               let newArray;
               [...newArray] = kids;
               newArray.push(childData.child);
               setKids(newArray);
          }).then(() => {
               modalToggle();
          });
     }

     useEffect(() => {
          fetchChildren();
     }, []);

     return(
          <>
               <Row>
               {/* CHILD SELECTION DROPDOWN MENU */}
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                         <DropdownToggle caret>
                              {!activeChildData.name ? 'Select a child' : activeChildData.name}
                         </DropdownToggle>
                         <DropdownMenu>
                              {kidList()}
                              <DropdownItem>
                                   Child Two
                              </DropdownItem>
                         </DropdownMenu>
                    </Dropdown>

               {/* CREATE NEW CHILD MODAL */}
                    <Button onClick={modalToggle}>Add Child</Button>
                    <Modal isOpen={modal} toggle={modalToggle}>
                         <ModalHeader toggle={modalToggle}>Modal title</ModalHeader>
                         <ModalBody>

               {/* CREATE NEW CHILD FORM */}
                              <Form onSubmit={createChild}>
                                   <FormGroup>
                                        <Label htmlFor="newchildname">Name:</Label>
                                        <Input
                                             name="newchildname"
                                             placeholder="Name"
                                             onChange={(e) => setNewChildName(e.target.value)}/>
                                   </FormGroup>
                                   <FormGroup>
                                        <Label htmlFor="newchilddob">Date of Birth:</Label>
                                        <Input
                                             type="date"
                                             name="date"
                                             id="exampleDate"
                                             placeholder="date placeholder"
                                             onChange={(e) => setNewChildDob(e.target.value)}
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
                                                  onChange={(e) => setLbs(e.target.value)}
                                             />lbs
                                        </Row>
                                        <Row>
                                             <Input
                                                  type="number"
                                                  name="number"
                                                  id="exampleNumber"
                                                  placeholder="oz"
                                                  onChange={(e) => setOz(e.target.value)}
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
                                                  onChange={(e) => setFt(e.target.value)}
                                             />feet
                                        </Row>
                                        <Row>
                                             <Input
                                                  type="number"
                                                  name="number"
                                                  id="exampleNumber"
                                                  placeholder="inches"
                                                  onChange={(e) => setIn(e.target.value)}
                                             />inches
                                        </Row>
                                   </FormGroup>
                                   <ModalFooter>
                                        <Button type="submit" color="primary">Add Child</Button>
                                        <Button color="secondary" onClick={modalToggle}>Cancel</Button>
                                   </ModalFooter>
                              </Form>
                         </ModalBody>
                    </Modal>
               </Row>

               <Row>
                    <Col className="dashboard">
                         <Dashboard token={props.token}/>
                    </Col>
                    <Col className="portal-tiles">
                         <LogPortal />
                    </Col>
               </Row>
          </>
     )
}

export default Home;