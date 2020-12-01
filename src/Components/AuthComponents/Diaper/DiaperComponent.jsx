import React from 'react';
import {
     Form,
     FormGroup,
     Label,
     Input,
     Button,
     Col,
     Row
} from 'reactstrap';

export default class Diaper extends React.Component{
     constructor(props){
        super(props)

        this.logDiaper = this.logDiaper.bind(this);
        this.toggleTile = this.toggleTile.bind(this);

        this.state = {
            tileOn: false,
            newLogDiaperTime:'',
            newLogDiaperDay:'',
            newLogDirty:false,
            newLogWet:false,
            newLogDry:false,
        }
     }

     onToBool(par){
          return !par ? false : true;
     }

     toggleTile(){ this.setState({tileOn: !this.state.tileOn}) }

     logDiaper(e){
          e.preventDefault();
          let timeChanged = (this.state.newLogDiaperDay + ":" + this.state.newLogDiaperTime);
          console.log(timeChanged, "Dirty: ", this.onToBool(this.state.newLogDirty), "Wet: ", this.onToBool(this.state.newLogWet), "Dry: ", this.onToBool(this.state.newLogDry));

          fetch('https://jdi-babystats.herokuapp.com/diaperlog', {
               method: 'POST',
               body: JSON.stringify({
                    diaperlog: {
                         time_checked: timeChanged,
                         dirty: this.onToBool(this.state.newLogDirty),
                         wet: this.onToBool(this.state.newLogWet),
                         dry: this.onToBool(this.state.newLogDry),
                         childId: this.props.childId
                    }
               }),
               headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
               })
          }).then( (res) => res.json())
          .then( this.toggleTile )
     }

     render(){
          return(
               !this.state.tileOn ?
               <div>
                    <div onClick={this.toggleTile} className="tile-button">Log Diaper</div>
               </div>
               :
               <div>
                    <Form onSubmit={this.logDiaper}>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label htmlFor="day-checked" className="tile-label">Day Checked:</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="date"
                                             name="day-checked"
                                             className="time-input"
                                             onChange={(e) => this.setState({newLogDiaperDay: e.target.value})}
                                        />
                                   </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                             <Row>
                                   <Col>
                                        <Label htmlFor="time-checked" className="tile-label">Time Checked:</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="time"
                                             name="time-checked"
                                             placeholder="HH:MM"
                                             className="time-input"
                                             onChange={(e) => this.setState({newLogDiaperTime: e.target.value})}
                                        />
                                   </Col>
                             </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="wet" className="tile-label">Wet:</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="checkbox"
                                             name="wet"
                                             onChange={(e) => this.setState({newLogWet: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="dry" className="tile-label">Dry:</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="checkbox"
                                             name="dry"
                                             onChange={(e) => this.setState({newLogDry: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="dirty" className="tile-label">Dirty:</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="checkbox"
                                             name="dirty"
                                             onChange={(e) => this.setState({newLogDirty: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                            <Button type="submit" color="primary">Log Diaper</Button>
                            <Button color="secondary" onClick={this.toggleTile}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

//TODO: SUCCESS MESSAGE ON CREATION
//