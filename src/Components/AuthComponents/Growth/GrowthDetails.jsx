import React from 'react';
import {
     Table,
     Button
} from 'reactstrap';
import GrowthUpdate from './GrowthUpdate';

export default class GrowthDetails extends React.Component{
     constructor(props){
          super(props)
          this.displayGrowthLogs = this.displayGrowthLogs.bind(this);
          this.deleteLog = this.deleteLog.bind(this);
          this.editModalToggle = this.editModalToggle.bind(this);
          this.editLog = this.editLog.bind(this);
          this.editLogOff = this.editLogOff.bind(this);

          this.state = {
               logToEdit: {},
               activeEdit: false,
               nabbedLogs: []
          }
          
     }
     
     editModalToggle(){ this.setState({editModal: !this.state.editModal}) }

     editLog(log){
          console.log(log);
          this.setState({logToEdit: log});
          this.setState({activeEdit: !this.state.activeEdit})
     }
     
     editLogOff(){
          this.setState({activeEdit: !this.state.activeEdit})
     }

     deleteLog(log){
          console.log("Delete Log ", log)
          fetch(`https://jdi-babystats.herokuapp.com/growthlog/${log.id}`, {
          // fetch(`http://localhost:3030/foodlog/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          })
          .then(console.log("Log successfully deleted!"))
     }
     
     displayGrowthLogs(){
          return this.props.child.growthlogs.map((log, index) => {
               return(
                    <>
                         <tr key={index}>
                              <th scope="row">{log.id}</th>
                              <td>{log.check_date}</td>
                              <td>{log.length}</td>
                              <td>{log.weight}</td>
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
                    GrowthDetails
                    {console.log("Growth Details begun...")}
                    {
                         !this.state.activeEdit ? 
                         <Table striped>
                              <thead>
                                   <tr>
                                        <th>#</th>
                                        <th>Date checked:</th>
                                        <th>Length:</th>
                                        <th>Weight:</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {this.displayGrowthLogs()}
                              </tbody>
                         </Table> : 
                         <GrowthUpdate token={this.props.token} log={this.state.logToEdit} child={this.props.child} off={this.editLogOff}/>
                    }
                    
               </>
          )
     }
}