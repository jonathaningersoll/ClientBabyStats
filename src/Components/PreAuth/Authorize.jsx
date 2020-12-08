import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Login from './Login';
import Register from './Register';

export default class Authorize extends React.Component{
     constructor(props){
          super(props)
     }

     render(){
          return(
               <Container className="auth-container">
                    <Row>
                         <Col md="4" className="login-col">
                              <Login updateToken={this.props.updateToken} setRole={this.props.setRole} />
                         </Col>
                    </Row>
                    <Row>
                         <Col md="4" className="register">
                              <Register updateToken={this.props.updateToken} />
                         </Col>
                    </Row>
               </Container>
          )
     }
}