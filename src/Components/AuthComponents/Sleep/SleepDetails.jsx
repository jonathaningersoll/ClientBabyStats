import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';

export default class GrowthStats extends React.Component{
     constructor(props){
          super(props)

          this.state = {
               dropdownOpen: false,
          }
     }
     render(){
          return(

               <Row>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                         <DropdownToggle caret>
                              {!this.props.a ? 'Select a child(Home)' : this.state.activeChildData.name}
                         </DropdownToggle>
                         <DropdownMenu>
                              {this.kidList()}
                         </DropdownMenu>
                    </Dropdown>
               </Row>

               // render dropdown button > full crud buttons (add, update, delete)
               // in details pane, just some details.
               // set state var for each user property, when click edit button, toggle editable fields pane
          );
     }
}