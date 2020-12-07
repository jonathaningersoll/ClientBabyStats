import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';
import Sleep from './Sleep/SleepComponent';
import Food from './Food/FoodComponent';
import Diaper from './Diaper/DiaperComponent';
import Growth from './Growth/GrowthComponent';

export default class LogPortal extends React.Component{

     render(){
          return(
               <>
                    <h1>Log activity:</h1>
                    <Row>
                         <Col className="tile col-5">
                              <Sleep token={this.props.token} childId={this.props.id} />
                         </Col>
                         <Col className="tile col-5">
                              <Food token={this.props.token} childId={this.props.id} />
                         </Col>
                    </Row>
                    <Row>
                         <Col className="tile col-5">
                              <Diaper token={this.props.token} childId={this.props.id} />
                         </Col>
                         <Col className="tile col-5">
                              <Growth token={this.props.token} childId={this.props.id} />
                         </Col>
                    </Row>
               </>
          )
     }
}