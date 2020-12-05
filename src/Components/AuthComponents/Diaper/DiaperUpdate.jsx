import React from 'react';
import {
     Form,
     FormGroup,
     Input,
     Label,
     Button
} from 'reactstrap';

export default class DiaperUpdate extends React.Component{
     constructor(props){
          super(props)

          this.editDiaperLog = this.editDiaperLog.bind(this);

          this.state = {
               editDayChecked: '',
               editTimeChecked: '',
               editDirty: false,
               editWet: false,
               editDry: false
          }

     }

     onToBool(par){
          return !par ? false : true;
     }

     editDiaperLog(e){
          e.preventDefault();
          console.log(this.state);
          fetch(`https://jdi-babystats.herokuapp.com/diaperlog/${this.props.log.id}`,{
          // fetch(`http://localhost:3030/sleeplog/${this.props.log.id}`,{
               method: 'PUT',
               body: JSON.stringify({
                    diaperlog: {
                         time_checked: `${this.state.editDayChecked}:${this.state.editTimeChecked}:00`,
                         dirty: this.onToBool(this.state.editDirty),
                         wet: this.onToBool(this.state.editWet),
                         dry: this.onToBool(this.state.editDry),
                         childId: this.props.child.id
                    }
               }),
               headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then((res) => {
               console.log(res);
               res.json();
               this.props.off();
          }).catch((err) => {
               console.log("error!!!!!! ", err);
          })
     }

     render(){
          return(
               <>
               <h1>Edit Diaper Log: {this.props.log.id}</h1>
               <Form onSubmit={this.editDiaperLog}>
                    <FormGroup>
                         <Label htmlFor="date_checked" className="tile-label">Day Checked:</Label>
                         <Input
                              type="date"
                              name="date_checked"
                              className="time-input"
                              onChange={(e) => this.setState({editDayChecked: e.target.value})}/>
                         </FormGroup>
                    <FormGroup>
                         <Label htmlFor="time_fed" className="tile-label">Time Checked:</Label>
                         <Input
                              type="time"
                              name="time_fed"
                              placeholder="HH:MM"
                              className="time-input"
                              onChange={(e) => this.setState({editTimeChecked: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Dirty:
                         <Label htmlFor="dirty" className="tile-label"></Label>
                         <Input
                              type="checkbox"
                              name="dirty"
                              onChange={(e) => this.setState({editDirty: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Wet:
                         <Label htmlFor="wet" className="tile-label"></Label>
                         <Input
                              type="checkbox"
                              name="wet"
                              onChange={(e) => this.setState({editWet: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Dry:
                         <Label htmlFor="dry" className="tile-label"></Label>
                         <Input
                              type="checkbox"
                              name="dry"
                              onChange={(e) => this.setState({editDry: e.target.value})}/>
                    </FormGroup>
                         <Button type="submit" color="primary">Edit Log</Button>
               </Form>
                         <Button onClick={this.props.off}>Cancel</Button>
               </>
          )
     }
}