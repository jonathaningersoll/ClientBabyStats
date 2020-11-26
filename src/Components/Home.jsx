import React from 'react';
import Dashboard from './AuthComponents/Dashboard';
import LogPortal from './AuthComponents/LogPortal';
import {
     Row,
     Col
} from 'reactstrap';

const Home = (props) => {
     return(
          <>
               <Row>
                    <Col className="dashboard">
                         <Dashboard token={props.token}/>
                    </Col>
                    <Col className="portal-tiles">
                         <LogPortal />
                    </Col>
               </Row>
          </>
     )
}

export default Home;