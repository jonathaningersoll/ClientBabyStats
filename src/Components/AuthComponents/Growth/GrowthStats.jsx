import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';

export default class GrowthStats extends React.Component{
     constructor(props){
          super(props)
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);
     }

     displayLastFewLogs(x){
          if(x){
               console.log(x);
               return(
               x.sort().reverse().slice(0,7).map(log =>(
                    <Row>
                         <Col className="stat-font">
                              {log.check_date}
                         </Col>
                    </Row>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
                    <div>
                         <h3>Latest growth logs: </h3>
                         <Row className="status-top-row">
                              <Col>
                                   Last recorded:
                              </Col>
                         </Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.growthlogs)}
                    </div>
                    <div class="stat-details">
                         <a href="details">Details</a>
                    </div>     
               </>
          )
     }
}