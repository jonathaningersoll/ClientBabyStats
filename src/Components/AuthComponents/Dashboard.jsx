import React from 'react';
import DiaperStats from './Diaper/DiaperStats';
import GrowthStats from './Growth/GrowthStats';
import FoodStats from './Food/FoodStats';
import SleepStats from './Sleep/SleepStats';
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
                         <SleepStats activeChild={this.props.activeChild} />
                    </Row>

                    <Row className="dashboard-stat">
                         <FoodStats activeChild={this.props.activeChild} />                    {/* << currently working on */}
                    </Row>
                    <Row className="dashboard-stat">
                         <DiaperStats activeChild={this.props.activeChild} />
                    </Row>
                    <Row className="dashboard-stat">
                         <GrowthStats activeChild={this.props.activeChild} />
                    </Row>
               </div>
          )
     }
}