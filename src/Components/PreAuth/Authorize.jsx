import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Login from './Login';
import Register from './Register';

function Authorize (props) {
     
     return(
          <Container className="auth-container">
               <Row>
                    
                    <Col md="6" className="login-col">
                         <Login updateToken={props.updateToken} setRole={props.setRole} />
                    </Col>
               </Row>
               <Row>
                    <Col md="6" className="register">
                         <Register updateToken={props.updateToken} />
                    </Col>
               </Row>
          </Container>
          // <>
          //      <h1>PreAuth Welcome</h1>
          //      <p>
          //           <Login />
          //      </p>
          //      <p>
          //           <Register />
          //      </p>
          // </>
          
     )
}

export default Authorize;