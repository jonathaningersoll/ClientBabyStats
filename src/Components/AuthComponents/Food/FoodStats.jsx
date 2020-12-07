import React from 'react';

export default class FoodStats extends React.Component{
     constructor(props) {
          super(props)

          this.state = {
          }
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);
          this.niceDate = this.niceDate.bind(this);

     }

     niceDate(date){
          var d = new Date(date).toUTCString();
          return d;
     }

     displayLastFewLogs(x){
          if(x){
               return(
               x.reverse().slice(0,7).map(log =>(
                    <>
                         <tr className="dash-stat-text">
                              <td>{log.solid}</td>
                              <td>{log.Bottle}</td>
                              <td></td>
                         </tr>
                    </>
                    // <Row>
                    //      <Col className="stat-font">
                    //           {log.time_fed}
                    //      </Col>
                    // </Row>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
               <div>
                    <h3>Latest Food Stats</h3>
               </div>
                    <table>
                         <thead>
                              <tr>
                                   <th>Meal Date</th>
                                   <th>Meal Time</th>
                                   <th>Served: </th>
                              </tr>
                         </thead>
                         <tbody>
                              {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.foodlogs)}
                         </tbody>
                    </table>
                    {/* <div>
                         <h3>Latest food stats</h3>
                         <Row className="status-top-row">
                              <Col>
                                   Last meals:
                              </Col>
                         </Row>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.foodlogs)}
                    </div>
                    <div class="stat-details">
                         <a href="details">Details</a>
                    </div>      */}
               </>
          )
     }
}

// TODO: CHANGE FOOD MODEL BREAST TO BOOLEAN - RIGHT NOW, FOR WHATEVER REASON, IT'S A STRING??!