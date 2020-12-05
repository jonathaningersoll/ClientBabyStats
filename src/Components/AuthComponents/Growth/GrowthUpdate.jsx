import React from 'react';
import {
     Form,
     FormGroup,
     Input,
     Label,
     Button
} from 'reactstrap';

export default class GrowthUpdate extends React.Component{
     constructor(props){
          super(props)

          this.editGrowthLog = this.editGrowthLog.bind(this);

          this.state = {
               editCheckDate: '',
               editLengthFt: '',
               editLengthInches: '',
               editWeightLbs: '',
               editWeightOz: '',
          }

     }

     onToBool(par){
          return !par ? false : true;
     }

     editGrowthLog(e){
          e.preventDefault();
          let weight = parseInt(this.state.editLengthFt)*16 + parseInt(this.state.editLengthInches);
          let length = parseInt(this.state.editWeightLbs)*12 + parseInt(this.state.editWeightOz);
          console.log("Edit Growth Function firing!",this.state);
          fetch(`https://jdi-babystats.herokuapp.com/growthlog/${this.props.log.id}`,{
          // fetch(`http://localhost:3030/sleeplog/${this.props.log.id}`,{
               method: 'PUT',
               body: JSON.stringify({
                    growthlog: {
                         check_date: `${this.state.editCheckDate}:00:00:00`,
                         editLength: length,
                         editWeight: weight,
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
               <h1>Edit Growth Log: {this.props.log.id}</h1>
               <Form onSubmit={this.editGrowthLog}>
                    <FormGroup>
                         <Label htmlFor="date_checked" className="tile-label">Day Checked:</Label>
                         <Input
                              type="date"
                              name="date_checked"
                              className="time-input"
                              onChange={(e) => this.setState({editCheckDate: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Length:<br />
                         <Label htmlFor="lengthft" className="tile-label">Feet:</Label>
                         <Input
                              type="number"
                              name="lengthft"
                              onChange={(e) => this.setState({editLengthFt: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>
                         <Label htmlFor="inches" className="tile-label">Inches</Label>
                         <Input
                              type="number"
                              name="inches"
                              onChange={(e) => this.setState({editLengthInches: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>Weight:<br />
                         <Label htmlFor="weightlbs" className="tile-label">lbs</Label>
                         <Input
                              type="number"
                              name="weightlbs"
                              onChange={(e) => this.setState({editWeightLbs: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check inline>
                         <Label htmlFor="weightoz" className="tile-label">Oz</Label>
                         <Input
                              type="number"
                              name="weightoz"
                              onChange={(e) => this.setState({editWeightOz: e.target.value})}/>
                    </FormGroup>
                         <Button type="submit" color="primary">Edit Log</Button>
               </Form>
                         <Button onClick={this.props.off}>Cancel</Button>
               </>
          )
     }
}