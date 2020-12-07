import React from 'react';

export default class GrowthStats extends React.Component{
     constructor(props){
          super(props)
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
               x.sort().reverse().slice(0,7).map(log =>(
                    <>
                         <tr className="dash-stat-text">
                              <td>{this.niceDate(log.check_date)}</td>
                              <td>{log.length}</td>
                              <td>{log.weight}</td>
                         </tr>
                    </>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
               <div>
                    <h3>Latest Growth Stats</h3>
               </div>
                    <table>
                         <thead>
                              <tr>
                                   <th>Date</th>
                                   <th>Height:</th>
                                   <th>Weight:</th>
                              </tr>
                         </thead>
                         <tbody>
                              {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.growthlogs)}
                         </tbody>
                    </table>

                    {/* <div>
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
                    </div>*/}
               </>
          )
     }
}