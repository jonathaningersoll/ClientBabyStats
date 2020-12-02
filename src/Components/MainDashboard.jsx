import React from 'react';
import {
     Col,
     Row
} from 'reactstrap';
import Dashboard from './AuthComponents/Dashboard';
import LogPortal from './AuthComponents/LogPortal';

export default class MainDashboard extends React.Component {
     // constructor(props){
     //      super(props)
     // }

     render(){
          return(
               <Row>
                    <Col className="dashboard col-4">
                         <Dashboard token={this.props.token} activeChild={this.props.activeChild}/>
                    </Col>

                    <Col className="portal-tiles col-8">
                         {!this.props.activeChild ? <div></div> : <LogPortal token={this.props.token} id={this.props.activeChild.id}/>}
                    </Col>
               </Row>
          )
     }
}