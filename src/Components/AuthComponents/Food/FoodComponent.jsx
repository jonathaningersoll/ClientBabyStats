import React from 'react';
import {
     Form,
     FormGroup,
     Label,
     Input,
     Button,
} from 'reactstrap';

export default class Food extends React.Component{
     constructor(props){
        super(props)

        this.logMeal = this.logMeal.bind(this);
        this.toggleTile = this.toggleTile.bind(this);

        this.state = {
            tileOn: false,
            newLogDayFed:'',
            newLogTimeFed:'',
            newLogBreast:false,
            newLogBottle:0,
            newLogSolid:''
        }
     }

    toggleTile(){ this.setState({tileOn: !this.state.tileOn}) }

    logMeal(e){
        e.preventDefault();
        let timeFed = (this.state.newLogDayFed + ":" + this.state.newLogTimeFed);
        fetch('https://jdi-babystats.herokuapp.com/foodlog', {
            method: 'POST',
            body: JSON.stringify({
                foodlog: {
                        time_fed: timeFed,
                        breast:this.state.newLogBreast,
                        bottle:this.state.newLogBottle,
                        solid:this.state.newLogSolid,
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
                <div onClick={this.toggleTile} className="tile-button">Log Meal</div>
            </div>
            :
            <div>
                <Form onSubmit={this.logMeal}>
                        <FormGroup>
                            <Label htmlFor="day-fed" className="tile-label">Day Fed:</Label>
                            <Input
                                type="date"
                                name="day-fed"
                                className="time-input"
                                onChange={(e) => this.setState({newLogDayFed: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="time-fed" className="tile-label">Time Fed:</Label>
                            <Input
                                type="time"
                                name="time-fed"
                                placeholder="HH:MM"
                                className="time-input"
                                onChange={(e) => this.setState({newLogTimeFed: e.target.value})}/>
                        </FormGroup>
                        <FormGroup check inline>Breast:
                            <Label check className="tile-label">
                                <Input
                                    type="checkbox"
                                    name="breast"
                                    onChange={(e) => this.setState({newLogBreast: e.target.value})}
                                />
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>Bottle(oz):
                            <Label for="ounces" className="tile-label">
                                <Input
                                    type="number"
                                    name="ounces"
                                    placeholder="oz"
                                    onChange={(e) => this.setState({newLogBottle: e.target.value})}
                                    id="ounces"
                                />
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label for="solid" className="tile-label">
                                <Input
                                    type="text"
                                    name="solid"
                                    placeholder="Solid food"
                                    onChange={(e) => this.setState({newLogSolid: e.target.value})}
                                    id="solid"
                                />
                            </Label>
                        </FormGroup>
                            <Button type="submit" color="primary">Log Meal</Button>
                            <Button color="secondary" onClick={this.toggleTile}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

//TODO: SUCCESS MESSAGE ON CREATION
//