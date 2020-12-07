import React from 'react';
import {
     Form,
     FormGroup,
     Input,
     Label,
     Button
} from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class FoodUpdate extends React.Component{
     constructor(props){
          super(props)

          this.editFoodLog = this.editFoodLog.bind(this);

          this.state = {
               editDateFed: '',
               editTimeFed: '',
               editBreast: '',
               editBottle: '',
               editSolid: ''
          }

     }

     editFoodLog(e){
          e.preventDefault();
          fetch(`${APIURL}/foodlog/${this.props.log.id}`,{
          // fetch(`http://localhost:3030/sleeplog/${this.props.log.id}`,{
               method: 'PUT',
               body: JSON.stringify({
                    foodlog: {
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
               <h1>Edit Food Log: {this.props.log.id}</h1>
               <Form onSubmit={this.editFoodLog}>
                    <FormGroup>
                         <Label htmlFor="time_fed" className="tile-label">Time fed:</Label>
                         <Input
                              type="date"
                              name="time_fed"
                              className="time-input"
                              onChange={(e) => this.setState({editTimeFed: e.target.value})}/>
                         </FormGroup>
                    <FormGroup>
                         <Label htmlFor="date_fed" className="tile-label">Day:</Label>
                         <Input
                              type="time"
                              name="date_fed"
                              placeholder="HH:MM"
                              className="time-input"
                              onChange={(e) => this.setState({editDateFed: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Breast
                         <Label htmlFor="breast" className="tile-label">:</Label>
                         <Input
                              type="checkbox"
                              name="breast"
                              onChange={(e) => this.setState({editBreast: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>Bottle:
                         <Label htmlFor="newchilddob" className="tile-label"></Label>
                         <Input
                              type="number"
                              name="bottle"
                              placeholder="Oz"
                              onChange={(e) => this.setState({editBottle: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Solid:
                         <Label htmlFor="solid" className="tile-label"></Label>
                         <Input
                              type="text"
                              name="solid"
                              placeholder="Solid Food"
                              onChange={(e) => this.setState({editSolid: e.target.value})}/>
                    </FormGroup>
                         <Button type="submit" color="primary">Edit Log</Button>
               </Form>
                         <Button onClick={this.props.off}>Cancel</Button>
               </>
          )
     }
}