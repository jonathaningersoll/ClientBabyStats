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

export default class Details extends React.Component{

     render(){
          return(
               <BrowserRouter>
                    <Row>
                         <Col md="2">
                              <Row>
                                   <Link to="/sleepdetails">
                                        Sleep logs
                                   </Link>
                                   
                              </Row>
                              <Row>
                                   <Link to="/fooddetails">
                                        Food logs
                                   </Link>
                              </Row>
                              <Row>
                                   <Link to="/diaperdetails">
                                        Diaper logs
                                   </Link>
                              </Row>
                              <Row>
                                   <Link to="/growthdetails">
                                        Growth logs
                                   </Link>
                                   
                              </Row>
                         </Col>
                         <Col md="10">
                              <Switch>
                                   <Route exact path="/sleepdetails">
                                        <SleepDetails token={this.props.token} child={this.props.activeChild}/>
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
                              </Switch>
                         </Col>
                    </Row>
               </BrowserRouter>
          )
     }
}