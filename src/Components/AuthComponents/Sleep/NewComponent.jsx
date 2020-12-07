import React from 'react';
import {
     Form,
     FormGroup,
     Input,
     Label,
     Button
} from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class NewComponent extends React.Component{
     constructor(props){
          super(props)

          this.editSleepLog = this.editSleepLog.bind(this);

          this.state = {
               editStartDate: '',
               editStartTime: '',
               editStopDate: '',
               editStopTime: '',
          }

     }

     editSleepLog(e){
          e.preventDefault();

          fetch(`${APIURL}/sleeplog/${this.props.log.id}`,{
          // fetch(`http://localhost:3030/sleeplog/${this.props.log.id}`,{
               method: 'PUT',
               body: JSON.stringify({
                    sleeplog: {
                         start: `${this.state.editStartDate}:${this.state.editStartTime}:00`,
                         stop: `${this.state.editStopDate}:${this.state.editStopTime}:00`,
                         childId: this.props.child.id
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               res.json();
               this.props.off();
          }).catch((err) => {
               console.log("error!!!!!! ", err);
          })
     }

     render(){
          return(
               <>
               <h1>Edit Sleep Log: {this.props.log.id}</h1>
               <Form onSubmit={this.editSleepLog}>
                    <FormGroup>
                         <Label htmlFor="start_day" className="tile-label">Sleep Start:</Label>
                         <Input
                              type="date"
                              name="start_day"
                              className="time-input"
                              onChange={(e) => this.setState({editStartDate: e.target.value})}/>
                         </FormGroup>
                    <FormGroup>
                         <Label htmlFor="newchildname" className="tile-label"></Label>
                         <Input
                              type="time"
                              name="start"
                              placeholder="HH:MM"
                              className="time-input"
                              onChange={(e) => this.setState({editStartTime: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="end_day" className="tile-label">Sleep Stop:</Label>
                         <Input
                              type="date"
                              name="end_day"
                              className="time-input"
                              onChange={(e) => this.setState({editStopDate: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="newchilddob" className="tile-label"></Label>
                         <Input
                              type="time"
                              name="stop"
                              className="time-input"
                              placeholder="date placeholder"
                              onChange={(e) => this.setState({editStopTime: e.target.value})}/>
                    </FormGroup>
                         <Button type="submit" color="primary">Edit Log</Button>
               </Form>
                         <Button onClick={this.props.off}>Cancel</Button>
               </>
          )
     }
}