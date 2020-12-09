import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';
import {
     BrowserRouter,
     Switch,
     Route,
     Link
} from 'react-router-dom';
import SleepDetails from './Sleep/SleepDetails';
import FoodDetails from './Food/FoodDetails';
import DiaperDetails from './Diaper/DiaperDetails';
import GrowthDetails from './Growth/GrowthDetails';
import EditChild from './ChildEdit/EditChild';
import EditTest from './TestComponents/EditTest';

export default class Details extends React.Component{

     render(){
          return(
               <BrowserRouter>
                         <Col className="col-3">
                              <Link to="/sleepdetails">
                                   <Row className="detail-button">
                                        Sleep logs
                                   </Row>
                              </Link>
                              <Link to="/fooddetails">
                                   <Row className="detail-button">
                                        Food logs
                                   </Row>
                              </Link>
                              <Link to="/diaperdetails">
                                   <Row className="detail-button">
                                        Diaper logs
                                   </Row>
                              </Link>
                              <Link to="/growthdetails">
                                   <Row className="detail-button">
                                        Growth logs
                                   </Row>
                              </Link>
                              <Link to="/childedit">
                                   <Row className="detail-button">
                                        Edit Child
                                   </Row>
                              </Link>  
                              <Link to="/edittest">
                                   <Row className="detail-button">
                                        Edit Food Test Component
                                   </Row>
                              </Link>  
                         </Col>
                         
                         <Col className="col-9 details-data">
                              <Switch>
                                   <Route exact path="/sleepdetails">
                                        <SleepDetails token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                                   <Route path="/fooddetails">
                                        <FoodDetails token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                                   <Route path="/diaperdetails">
                                        <DiaperDetails token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                                   <Route path="/growthdetails">
                                        <GrowthDetails token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                                   <Route path="/childedit">
                                        <EditChild token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                                   <Route path="/edittest">
                                        <EditTest token={this.props.token} child={this.props.activeChild} />
                                   </Route>
                              </Switch>
                         </Col>
               </BrowserRouter>
          )
     }
}