import React from 'react';

export default class DiaperStats extends React.Component{
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
               console.log(x);
               return(
               x.reverse().slice(0,7).map(log =>(
                    <>
                         <tr className="dash-stat-text">
                              <td>{this.niceDate(log.time_checked)}</td>
                         </tr>
                    </>

                    // <Row>
                    //      <Col className="stat-font">
                    //           {log.time_checked}
                    //      </Col>
                    // </Row>
               )))
          }else{return <div>No logs exist</div>}
     }

     render(){
          return(
               <>
               <div>
                    <h3>Diaper last checked</h3>
          </div>
               <table>
                    <thead>
                         <tr>
                              <th>Time</th>
                         </tr>
                    </thead>
                    <tbody>
                         {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.diaperlogs)}
                    </tbody>
               </table>
                    {/* <div>
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
                    </div>      */}
               </>
          )
     }
}