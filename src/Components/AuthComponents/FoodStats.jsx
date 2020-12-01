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
               return(
               x.reverse().slice(0,7).map(log =>(
                    <Row>
                         <Col className="stat-font">
                              {/* FOOD LOG ELEMENTS HERE */}
                         </Col>
                         <Col className="stat-font">
                              {/* FOOD LOG ELEMENTS HERE */}
                         </Col>
                    </Row>
               )))
          }else{return <div></div>}
     }

     render(){
          return(
               <>
                    <div>
                         <h3>Latest food stats </h3>
                         <Row className="status-top-row">
                              <Col>
                                   {/* Food log info */}
                              </Col>
                         </Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.sleeplogs)}
                    </div>
                    <div class="stat-details">
                         <a href="details">Details</a>
                    </div>     
               </>
          )
     }
}