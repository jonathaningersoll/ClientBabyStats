import React from 'react';
import {
     Table,
     Button,
} from 'reactstrap';

export default class TestIndex extends React.Component{
     constructor(props){
          super(props)

          this.displayMeals = this.displayMeals.bind(this);
     }

     displayMeals(){
          return(
               !this.props.logList
               ?<></>
               :this.props.logList.map((log, index) => (
                    <>
                         <tr key={index}>
                              <th scope="row">{log.id}</th>
                              <td>{log.time_fed.name}</td>
                              <td>{log.breast}</td>
                              <td>{log.bottle}</td>
                              <td>{log.solid}</td>
                              <td>
                                   <Button color="warning" onClick={() => {this.props.editLog(log)}}>Update</Button>
                                   <Button color="danger" onClick={() => {this.props.deleteLog(log)}}>Delete</Button>
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
                                   <th>Meal Time</th>
                                   <th>Breast</th>
                                   <th>Bottle</th>
                                   <th>Solid</th>
                                   <th>Options:</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.displayMeals()}
                         </tbody>
                    </Table>
               </>
          )
     }
}