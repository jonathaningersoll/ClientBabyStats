import React from 'react';
import {
     Form,
     FormGroup,
     Label,
     Input,
     ModalFooter,
     Button,
} from 'reactstrap';

export default class Sleep extends React.Component{
     constructor(props){
          super(props)
          this.logSleep = this.logSleep.bind(this);
          this.state = {
               newLogStart:'',
               newLogStop:''
          }
     }

     logSleep(e){
          e.preventDefault();
          let Date = new Date();
          console.log(this.state.newLogStart);
          fetch('https://jdi-babystats.herokuapp.com/sleeplog', {
               method: 'POST',
               body: JSON.stringify({
                    sleeplog: {
                         sleep_start: this.state.newLogStart,
                         sleep_stop: this.state.newLogStop,
                         childId: this.props.childId
                    }
               }),
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then( (res) => (console.log('new log created')))
     }

     render(){
          return(
               <Form onSubmit={this.logSleep}>
                    <FormGroup>
                         <Label htmlFor="newchildname">Sleep Start:</Label>
                         <Input
                              type="time"
                              name="start"
                              placeholder="HH:MM"
                              className="time-input"
                              onChange={(e) => this.setState({newLogStart: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="newchilddob">Sleep Stop:</Label>
                         <Input
                              type="time"
                              name="stop"
                              className="time-input"
                              placeholder="date placeholder"
                              onChange={(e) => this.setState({newLogStop: e.target.value})}
                         />
                    </FormGroup>
                    <ModalFooter>
                         <Button type="submit" color="primary">Log Sleep</Button>
                         <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                    </ModalFooter>
               </Form>
          )
     }
}