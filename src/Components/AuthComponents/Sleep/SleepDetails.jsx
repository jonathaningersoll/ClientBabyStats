import React from 'react';
import {
     Table,
     Button
} from 'reactstrap';
import NewComponent from './NewComponent'

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
          console.log(log);
          this.setState({logToEdit: log});
          this.setState({activeEdit: !this.state.activeEdit})
     }
     editLogOff(){
          console.log("EDITLOGOFF RUN")
          this.setState({activeEdit: !this.state.activeEdit})
     }

     deleteLog(log){
          console.log("Delete Log ", log)
          fetch(`https://jdi-babystats.herokuapp.com/sleeplog/${log.id}`, {
          // fetch(`http://localhost:3030/sleeplog/${log.id}`, {
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

/*
          this.displaySleepLogs = this.displaySleepLogs.bind(this);
          this.dateFormatter = this.dateFormatter.bind(this);
          this.deleteLog = this.deleteLog.bind(this);
          this.setLog = this.setLog.bind(this);

          this.state = {
               editModal: false,
               editStartDate: '',
               editStartTime: '',
               editStopDate: '',
               editStopTime:'',
               id: 0
          }
     }

     editModalToggle(){ this.setState({editModal: !this.state.editModal}) }

     dateFormatter(date){
          var d = new Date(date);
          var day = d.getUTCDate();
          var m = d.getUTCMonth();
          var y = d.getUTCFullYear();
          var h = d.getUTCHours();
          var min = d.getUTCMinutes();
          var newTime = `${h}:${min}`;          
          var newDate = `${m}/${day}/${y}`;
          
          return(
               <>
                    {newDate}, {newTime}
               </>
          );
     }

     setLog(logId){
          this.setState({id: logId})
          console.log("Log ID set: ",logId)
     }
     

     displaySleepLogs(){
          return(
               this.props.logs.map( (log, i) => (
                    <tr>
                         <td>{`${i + 1}`}</td>
                         <td>{this.dateFormatter(log.sleep_start)}</td>
                         <td>{this.dateFormatter(log.sleep_stop)}</td>
                         <td>length of sleep here</td>
                         <td>
                              <Button onClick={this.editModalToggle}>Edit</Button>
                              <Modal isOpen={this.state.editModal} toggle={this.editModalToggle}>
                                   <ModalHeader toggle={this.modalToggle}>Edit Log</ModalHeader>
                                   <ModalBody>
                                        <Form onSubmit={this.editSleepLog}>
                                             {this.setLog(log.id)}
                                             <FormGroup>
                                                  <Label htmlFor="start_day" className="tile-label">Sleep Start:</Label>
                                                  <Input
                                                       type="date"
                                                       name="start_day"
                                                       className="time-input"
                                                       onChange={(e) => this.setState({editStartDate: e.target.value, id: log.id})}/>
                                                  </FormGroup>
                                             <FormGroup>
                                                  <Label htmlFor="newchildname" className="tile-label"></Label>
                                                  <Input
                                                       type="time"
                                                       name="start"
                                                       placeholder="HH:MM"
                                                       className="time-input"
                                                       onChange={(e) => this.setState({editStartTime: e.target.value, id: log.id})}/>
                                             </FormGroup>
                                             <FormGroup>
                                                  <Label htmlFor="end_day" className="tile-label">Sleep Stop:</Label>
                                                  <Input
                                                       type="date"
                                                       name="end_day"
                                                       className="time-input"
                                                       onChange={(e) => this.setState({editStopDate: e.target.value, id: log.id})}/>
                                             </FormGroup>
                                             <FormGroup>
                                                  <Label htmlFor="newchilddob" className="tile-label"></Label>
                                                  <Input
                                                       type="time"
                                                       name="stop"
                                                       className="time-input"
                                                       placeholder="date placeholder"
                                                       onChange={(e) => this.setState({editStopTime: e.target.value, id: log.id})}/>
                                             </FormGroup>
                                             <ModalFooter>
                                                  <Button type="submit" color="primary">Edit Log</Button>
                                                  <Button onClick={this.deleteLog}>Delete</Button>
                                                  <Button color="secondary" onClick={() => this.editModalToggle}>Cancel</Button>
                                             </ModalFooter>
                                        </Form>
                                   </ModalBody>
                              </Modal>
                              
                         </td>
                    </tr>
          )))
     }

     editSleepLog(){
          let url = `https://jdi-babystats.herokuapp.com/sleeplog/${this.state.id}`;
          // console.log(url, this.props.child.id, `${this.state.editStartDate}:${this.state.editStartTime}:00`, `${this.state.editStopDate}:${this.state.editStopTime}:00`, parseInt(this.props.child.id));
          let kid = this.props.child.id;
          // console.log("Kid ", kid);
          fetch(url, {
               method: 'PUT',
               body: JSON.stringify({

                    sleeplog: {
                         start: `${this.state.editStartDate}:${this.state.editStartTime}:00`,
                         stop: `${this.state.editStopDate}:${this.state.editStopTime}:00`,
                         childId: kid
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               console.log("Response: ",res);
          })
     }

     deleteLog(){
          console.log("Deleting log: ",this.state.id);
          fetch(`https://jdi-babystats.herokuapp.com/sleeplog/${this.state.id}`, {
               method: 'DELETE',
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          })
          .then(console.log("Successfully deleted!"))
     }

     render(){
          return(
               <Table striped>
                    <thead>
                         <tr>
                              <th>#</th>
                              <th>Date and time put down:</th>
                              <th>Date and time Awake:</th>
                              <th>length of sleep here:</th>
                         </tr>
                         {this.displaySleepLogs()}
                    </thead>
                    
               </Table>

               // render dropdown button > full crud buttons (add, update, delete)
               // in details pane, just some details.
               // set state var for each user property, when click edit button, toggle editable fields pane
          );
     }*/
}