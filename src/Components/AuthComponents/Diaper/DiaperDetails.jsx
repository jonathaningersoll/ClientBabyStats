import React from 'react';
import {
     Table,
     Button
} from 'reactstrap';
import DiaperUpdate from './DiaperUpdate';
import APIURL from '../../helpers/environment';

export default class DiaperDetails extends React.Component{
     constructor(props){
          super(props)
          this.displayDiaperLogs = this.displayDiaperLogs.bind(this);
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
          fetch(`${APIURL}/diaperlog/${log.id}`, {
          // fetch(`http://localhost:3030/foodlog/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          })
     }
     
     displayDiaperLogs(){
          return this.props.child.diaperlogs.map((log, index) => {
               return(
                    <>
                         <tr key={index}>
                              <th scope="row">{log.id}</th>
                              <td>{log.time_checked}</td>
                              <td>{log.dirty}</td>
                              <td>{log.wet}</td>
                              <td>{log.dry}</td>
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
                                        <th>Time checked:</th>
                                        <th>Dirty:</th>
                                        <th>Wet:</th>
                                        <th>Dry:</th>
                                        <th>Options:</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {this.displayDiaperLogs()}
                              </tbody>
                         </Table> : 
                         <DiaperUpdate token={this.props.token} log={this.state.logToEdit} child={this.props.child} off={this.editLogOff}/>
                    }
                    
               </>
          )
     }
}