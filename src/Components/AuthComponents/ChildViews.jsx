import React from 'react';

export default class ChildViews extends React.Component{
     constructor(props){
          super(props)
     }

     render(){
          return(
               <Row>
                    <Col className="dashboard col-4">
                                   <Dashboard token={this.props.token} activeChild={this.state.activeChildData}/>
                              </Col>

                              <Col className="portal-tiles col-8">
                                   <LogPortal token={this.props.token} id={this.state.activeChildData.id}/>
                    </Col>
               </Row>
          )
     }
}