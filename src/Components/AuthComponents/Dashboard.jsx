import React from 'react';
import DiaperStats from './DiaperStats';
import GrowthStats from './SleepStats';
import FoodStats from './SleepStats';
import SleepStats from './SleepStats';
import {
     Row,
} from 'reactstrap'

// What Dashboard will do:
// provide the opportunity to acquire the logged-in user's children from a drop-down
// A selection from the drop-down will set the state variables for the child


export default class Dashboard extends React.Component{

     constructor(props){
          super(props);
          
          this.state = {
          }
     }

     render(){

          return(
               <div>
                    <Row className="dashboard">
                         <h1>{!this.props.activeChild.name ? 'Dashboard' : this.props.activeChild.name}</h1>
                    </Row>

                    <Row className="dashboard-stat">
                         <div>
                              {console.log("Dashboard active child: ", this.props.activeChild)}
                         </div>
                         <SleepStats activeChild={this.props.activeChild}/>
                    </Row>

                    <Row className="dashboard-stat">
                         <FoodStats />
                    </Row>
                    <Row className="dashboard-stat">
                         <DiaperStats />
                    </Row>
                    <Row className="dashboard-stat">
                         <GrowthStats />
                    </Row>
               </div>
          )
     }
}