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
import APIURL from '../../helpers/environment';

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

          fetch(`${APIURL}/diaperlog`, {
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
               <div className="open-log">
                    <Form onSubmit={this.logDiaper}>
                         <FormGroup>
                              <Label htmlFor="day-checked">Day Checked:</Label>
                                   <Input
                                        type="date"
                                        name="day-checked"
                                        onChange={(e) => this.setState({newLogDiaperDay: e.target.value})}
                                   />
                         </FormGroup>
                         <FormGroup>
                              <Label htmlFor="time-checked">Time Checked:</Label>
                                   <Input
                                        type="time"
                                        name="time-checked"
                                        onChange={(e) => this.setState({newLogDiaperTime: e.target.value})}
                                   />
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="wet">Wet:</Label>
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
                                        <Label check htmlFor="dry">Dry:</Label>
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
                                        <Label check htmlFor="dirty">Dirty:</Label>
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