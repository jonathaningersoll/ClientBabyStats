import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';

export default class FoodStats extends React.Component{
     constructor(props) {
          super(props)

          this.state = {
          }
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);

     }

     displayLastFewLogs(x){
          if(x){
               console.log(x);
               return(
               x.reverse().slice(0,7).map(log =>(
                    <Row>
                         <Col className="stat-font">
                              {log.time_fed}
                         </Col>
                    </Row>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
                    <div>
                         <h3>Latest food stats </h3>
                         <Row className="status-top-row">
                              <Col>
                                   Last meals:
                              </Col>
                         </Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.foodlogs)}
                    </div>
                    <div class="stat-details">
                         <a href="details">Details</a>
                    </div>     
               </>
          )
     }
}

// TODO: CHANGE FOOD MODEL BREAST TO BOOLEAN - RIGHT NOW, FOR WHATEVER REASON, IT'S A STRING??!