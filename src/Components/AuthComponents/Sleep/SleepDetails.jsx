import React from 'react';
import {
     Row,
} from 'reactstrap';

export default class SleepDetails extends React.Component{
     constructor(props){
          super(props)

     }


     render(){
          return(

               <Row>
                    Hello
               </Row>

               // render dropdown button > full crud buttons (add, update, delete)
               // in details pane, just some details.
               // set state var for each user property, when click edit button, toggle editable fields pane
          );
     }
}