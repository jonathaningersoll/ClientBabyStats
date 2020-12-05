import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';
import {
     BrowserRouter,
     Link,
     Route,
     Switch
} from 'react-router-dom';
import SleepDetails from './SleepDetails';

export default class SleepStats extends React.Component{
     constructor(props) {
          super(props)

          this.state = {
          }
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);

     }

     displayLastFewLogs(x){
          if(x){
               return(
               x.reverse().slice(0,7).map(log =>(
                    <Row>
                         <Col className="stat-font">
                              {log.sleep_start}
                         </Col>
                         <Col className="stat-font">
                              {log.sleep_stop}
                         </Col>
                    </Row>
               )))
          }else{return <div></div>}
     }

     render(){
          return(
               <BrowserRouter>
                    <Row className="status-top-row">
                         <Col>
                              Start Time:
                         </Col>
                         <Col>
                              Stop Time:
                         </Col>
                         <Col>
                         </Col>
                    </Row>
                    <Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.sleeplogs)}
                    </Row>
               </BrowserRouter>
          )
     }
}