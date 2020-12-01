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
        this.toggleTile = this.toggleTile.bind(this);

        this.state = {
            tileOn: false,
            newLogStart:'',
            newLogStop:''
        }
     }

    toggleTile(){ this.setState({tileOn: !this.state.tileOn}) }

    sleepLogConfirm(){
        
    }

    logSleep(e){
        e.preventDefault();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let logStart = `${year}-${month}-${day}:${this.state.newLogStart}:00`;
        let logStop = `${year}-${month}-${day}:${this.state.newLogStop}:00`;
        console.log(logStart);
        fetch('https://jdi-babystats.herokuapp.com/sleeplog', {
            method: 'POST',
            body: JSON.stringify({
                sleeplog: {
                        start: logStart,
                        stop: logStop,
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
                <div onClick={this.toggleTile} className="tile-button">Log Sleep</div>
            </div>
            :
            <div>
                <Form onSubmit={this.logSleep}>
                        <FormGroup>
                            <Label htmlFor="newchildname" className="tile-label">Sleep Start:</Label>
                            <Input
                                type="time"
                                name="start"
                                placeholder="HH:MM"
                                className="time-input"
                                onChange={(e) => this.setState({newLogStart: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="newchilddob" className="tile-label">Sleep Stop:</Label>
                            <Input
                                type="time"
                                name="stop"
                                className="time-input"
                                placeholder="date placeholder"
                                onChange={(e) => this.setState({newLogStop: e.target.value})}
                            />
                        </FormGroup>
                            <Button type="submit" color="primary">Log Sleep</Button>
                            <Button color="secondary" onClick={this.toggleTile}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

// TODO: ADD YEAR/MONTH/DAY SELECTION TO THE LOG CREATION > will not require db migration since I'm logging a date - I can just add to the date.
// TODO: SUCCESS MESSAGE ON CREATION
