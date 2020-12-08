import React from 'react';
import {
     Form,
     FormGroup,
     Label,
     Input,
     Button,
} from 'reactstrap';
import APIURL from '../../helpers/environment';

export default class Sleep extends React.Component{
     constructor(props){
        super(props)

        this.logSleep = this.logSleep.bind(this);
        this.toggleTile = this.toggleTile.bind(this);
        this.zeroPadder = this.zeroPadder.bind(this);

        this.state = {
            tileOn: false,
            newLogStartDate: '',
            newLogStopDate: '',
            newLogStart:'',
            newLogStop:''
        }
     }

    toggleTile(){ this.setState({tileOn: !this.state.tileOn}) }

    zeroPadder(d){
        return(d<10?0+`${d}`:d);
    }

    logSleep(e){
        e.preventDefault();
        let logStart = `${this.state.newLogStartDate}:${this.state.newLogStart}:00`;
        let logStop = `${this.state.newLogStopDate}:${this.state.newLogStop}:00`;
        fetch(`${APIURL}/sleeplog`, {
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
                        <Label htmlFor="start_day">Sleep Start:</Label>
                        <Input
                            type="date"
                            name="start_day"
                            onChange={(e) => this.setState({newLogStartDate: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="start"></Label>
                        <Input
                            type="time"
                            name="start"
                            onChange={(e) => this.setState({newLogStart: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="end_day">Sleep Stop:</Label>
                        <Input
                            type="date"
                            name="end_day"
                            onChange={(e) => this.setState({newLogStopDate: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="stop"></Label>
                        <Input
                            type="time"
                            name="stop"
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

// TODO: SUCCESS MESSAGE ON CREATION
