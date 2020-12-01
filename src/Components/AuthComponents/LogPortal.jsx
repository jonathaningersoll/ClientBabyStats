import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';
import Sleep from './Sleep/SleepComponent';
import Food from './Food/FoodComponent';

export default class LogPortal extends React.Component{

     render(){
          return(
               <>
                    <h1>Log Portal screen</h1>
                    <Row>
                         <Col className="tile">
                              <Sleep token={this.props.token} childId={this.props.id} />
                         </Col>
                         <Col className="tile">
                              <Food token={this.props.token} childId={this.props.id} />
                         </Col>
                    </Row>
                    <Row>
                         <Col className="tile">
                              Diaper
                         </Col>
                         <Col className="tile">
                              Growth
                         </Col>
                    </Row>
               </>
          )
     }
}