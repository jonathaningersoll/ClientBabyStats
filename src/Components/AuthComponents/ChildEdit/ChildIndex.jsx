import React from 'react';
import {
     Table,
     Button,
} from 'reactstrap';

export default class childIndex extends React.Component{
     constructor(props){
          super(props)

          this.displayChildren = this.displayChildren.bind(this);
     }

     displayChildren(){
          return(
               !this.props.childList
               ?<></>
               :this.props.childList.map((child, index) => (
                    <>
                         <tr key={index}>
                              <th scope="row">{child.id}</th>
                              <td>{child.name}</td>
                              <td>{child.dob}</td>
                              <td>{child.birth_weight}</td>
                              <td>{child.birth_length}</td>
                              <td>
                                   <Button color="warning" onClick={() => {this.props.editChild(child)}}>Update</Button>
                                   <Button color="danger" onClick={() => {this.props.deleteChild(child)}}>Delete</Button>
                              </td>
                         </tr>
                    </>
               ))
          )
     }

     render(){
          return(
               <>
                    <Table striped>
                         <thead>
                              <tr>
                                   <th>ID</th>
                                   <th>Child Name</th>
                                   <th>Date of Birth</th>
                                   <th>Birth weight</th>
                                   <th>Birth Length</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.displayChildren()}
                         </tbody>
                    </Table>
               </>
          )
     }
}