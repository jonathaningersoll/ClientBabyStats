import React from 'react';
import {
     Table,
     Button
} from 'reactstrap';
import NewComponent from './NewComponent'
import APIURL from '../../helpers/environment';

export default class SleepDetails extends React.Component{
     constructor(props){
          super(props)
          this.displaySleepLogs = this.displaySleepLogs.bind(this);
          this.deleteLog = this.deleteLog.bind(this);
          this.editModalToggle = this.editModalToggle.bind(this);
          this.editLog = this.editLog.bind(this);
          this.editLogOff = this.editLogOff.bind(this);

          this.state = {
               logToEdit: {},
               activeEdit: false,
          }
          
     }
     
     editModalToggle(){ this.setState({editModal: !this.state.editModal}) }

     editLog(log){
          this.setState({logToEdit: log});
          this.setState({activeEdit: !this.state.activeEdit})
     }
     editLogOff(){
          this.setState({activeEdit: !this.state.activeEdit})
     }

     deleteLog(log){
          fetch(`${APIURL}/sleeplog/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          })
          .then(console.log("Successfully deleted!"))
     }
     
     displaySleepLogs(){
          return this.props.child.sleeplogs.map((log, index) => {
               return(
                    <>
                         <tr key={index}>
                              <th scope="row">{log.id}</th>
                              <td>{log.sleep_start}</td>
                              <td>{log.sleep_stop}</td>
                              <td>
                                   <Button color="warning" onClick={() => {this.editLog(log)}}>Edit Log</Button>
                                   <Button color="danger" onClick={() => {this.deleteLog(log)}}>Delete</Button>
                              </td>
                         </tr>
                         <tr>
                              
                         </tr>
                    </>
               )
          })
     }

     render(){
          return(
               <>
                    {
                         !this.state.activeEdit ? 
                         <Table striped>
                              <thead>
                                   <tr>
                                        <th>#</th>
                                        <th>Start</th>
                                        <th>Stop</th>
                                        <th>Options:</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {this.displaySleepLogs()}
                              </tbody>
                         </Table> : 
                         <NewComponent token={this.props.token} log={this.state.logToEdit} child={this.props.child} off={this.editLogOff}/>
                    }
                    
               </>
          )
     }
}