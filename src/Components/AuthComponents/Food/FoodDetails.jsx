import React from 'react';
import {
     Table,
     Button
} from 'reactstrap';
import FoodUpdate from './FoodUpdate'

export default class FoodDetails extends React.Component{
     constructor(props){
          super(props)
          this.displayFoodLogs = this.displayFoodLogs.bind(this);
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
          fetch(`https://jdi-babystats.herokuapp.com/foodlog/${log.id}`, {
          // fetch(`http://localhost:3030/foodlog/${log.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          })
     }
     
     displayFoodLogs(){
          return this.props.child.foodlogs.map((log, index) => {
               return(
                    <>
                         <tr key={index}>
                              <th scope="row">{log.id}</th>
                              <td>{log.time_fedt}</td>
                              <td>{log.breast}</td>
                              <td>{log.bottle}</td>
                              <td>{log.solid}</td>
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
                                        <th>Time Fed:</th>
                                        <th>Breast:</th>
                                        <th>Bottle:</th>
                                        <th>Solid Food:</th>
                                        <th>Options:</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {this.displayFoodLogs()}
                              </tbody>
                         </Table> : 
                         <FoodUpdate token={this.props.token} log={this.state.logToEdit} child={this.props.child} off={this.editLogOff}/>
                    }
                    
               </>
          )
     }
}