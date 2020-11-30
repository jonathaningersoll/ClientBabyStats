import React from 'react';

export default class SleepStats extends React.Component{
     constructor(props) {
          super(props)

          this.state = {
          }
          this.hyper = this.hyper.bind(this);

     }

     hyper(x){
          return(
               !x ? <div> nothing </div> :
               x.map(log =>(
                    <div>
                         {log.sleep_start}
                    </div>
               ))
          )
     }

     render(){
          return(
               <div>
                    {!this.props.activeChild ? console.log("none") : console.log(this.props.activeChild.sleeplogs)}
                    {!this.props.activeChild ? console.log("nothing here yet") : this.hyper(this.props.activeChild.sleeplogs)}
                    {/* {!this.props.activeChild.sleeplogs ? 'null' : this.hyper(this.props.activeChild.sleeplogs)} */}
               </div>
          )
     }
}