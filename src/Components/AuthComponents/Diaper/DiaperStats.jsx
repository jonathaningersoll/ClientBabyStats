import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';

export default class DiaperStats extends React.Component{
     constructor(props){
          super(props)
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);
     }

     displayLastFewLogs(x){
          if(x){
               console.log(x);
               return(
               x.reverse().slice(0,7).map(log =>(
                    <Row>
                         <Col className="stat-font">
                              {log.time_checked}
                         </Col>
                    </Row>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
                    <div>
                         <h3>Latest diaper changes: </h3>
                         <Row className="status-top-row">
                              <Col>
                                   Last changed:
                              </Col>
                         </Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.diaperlogs)}
                    </div>
                    <div class="stat-details">
                         <a href="details">Details</a>
                    </div>     
               </>
          )
     }
}