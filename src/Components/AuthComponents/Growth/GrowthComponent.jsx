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

export default class Growth extends React.Component{
     constructor(props){
        super(props)

        this.logGrowth = this.logGrowth.bind(this);
        this.toggleTile = this.toggleTile.bind(this);

        this.state = {
            tileOn: false,
            newLogGrowthDate:'',
            newLogLengthFt:0,
            newLogLengthInches:0,
            newLogWeightLbs:0,
            newLogWeightOz:0,
        }
     }

     toggleTile(){ this.setState({tileOn: !this.state.tileOn}) }

     logGrowth(e){
          e.preventDefault();
          let timeRecorded = this.state.newLogGrowthDate;
          let weight = parseInt(this.state.newLogWeightLbs)*16 + parseInt(this.state.newLogWeightOz);
          let length = parseInt(this.state.newLogLengthFt)*12 + parseInt(this.state.newLogLengthInches);
          fetch('https://jdi-babystats.herokuapp.com/growthlog', {
               method: 'POST',
               body: JSON.stringify({
                    growthlog: {
                         check_date: timeRecorded,
                         length: length,
                         weight: weight,
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
                    <div onClick={this.toggleTile} className="tile-button">Log Growth</div>
               </div>
               :
               <div>
                    <Form onSubmit={this.logGrowth}>
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
                                             onChange={(e) => this.setState({newLogGrowthDate: e.target.value})}
                                        />
                                   </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="lengthft" className="tile-label">Length (ft):</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="number"
                                             name="lengthft"
                                             onChange={(e) => this.setState({newLogLengthFt: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="lengthin" className="tile-label">Length (in):</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="number"
                                             name="lengthin"
                                             onChange={(e) => this.setState({newLogLengthInches: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="weightlbs" className="tile-label">Weight (lbs):</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="number"
                                             name="weightlbs"
                                             onChange={(e) => this.setState({newLogWeightLbs: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                         <FormGroup>
                              <Row>
                                   <Col>
                                        <Label check htmlFor="weightoz" className="tile-label">Weight (oz):</Label>
                                   </Col>
                                   <Col>
                                        <Input
                                             type="number"
                                             name="weightoz"
                                             onChange={(e) => this.setState({newLogWeightOz: e.target.value})}
                                        />
                                  </Col>
                              </Row>
                         </FormGroup>
                            <Button type="submit" color="primary">Log Growth</Button>
                            <Button color="secondary" onClick={this.toggleTile}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

//TODO: SUCCESS MESSAGE ON CREATION
//