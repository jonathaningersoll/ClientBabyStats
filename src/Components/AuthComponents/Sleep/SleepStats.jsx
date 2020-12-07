import React from 'react';

export default class SleepStats extends React.Component{
     constructor(props) {
          super(props)

          this.state = {
          }
          this.displayLastFewLogs = this.displayLastFewLogs.bind(this);
          this.niceDate = this.niceDate.bind(this);
          this.lengthOfSleep = this.lengthOfSleep.bind(this);
     }

     niceDate(date){
          var d = new Date(date).toUTCString();
          return d;
     }

     lengthOfSleep(start, stop){
          var dateStart = new Date(start).getTime();
          var dateStop = new Date(stop).getTime();
          var time = dateStop - dateStart;
          return Math.floor(time/1000/60);
     }

     displayLastFewLogs(x){
          if(x){
               return(
               x.reverse().slice(0,7).map(log =>(
                    <>
                         <tr className="dash-stat-text">
                              <td>{this.niceDate(log.sleep_start)}</td>
                              <td>{this.lengthOfSleep(log.sleep_start, log.sleep_stop)}</td>
                         </tr>
                    </>

                    // <Row>
                    //      <Col className="stat-font">
                    //           {log.sleep_start}
                    //      </Col>
                    //      <Col className="stat-font">
                    //           {log.sleep_stop}
                    //      </Col>
                    // </Row>
               )))
          }else{return <div></div>}
     }

     render(){
          return(
               <>
               <div>
                    <h3>Sleep amount</h3>
               </div>
                    <table>
                         <thead>
                              <tr>
                                   <th>Start time</th>
                                   <th>Stop time</th>
                              </tr>
                         </thead>
                         <tbody>
                              {!this.props.activeChild ? console.log("nothing here yet") : this.displayLastFewLogs(this.props.activeChild.sleeplogs)}
                         </tbody>
                    </table>
                    {/* <Row className="status-top-row">
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
                    </Row> */}
               </>
          )
     }
}