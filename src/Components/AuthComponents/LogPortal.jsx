import React from 'react';
import {
     Row,
     Col
} from 'reactstrap';

const LogPortal = (props) => {
     return(
          <>
               <h1>Log Portal screen</h1>
               <Row>
                    <Col className="tile">
                         Sleep
                    </Col>
                    <Col className="tile">
                         Food
                    </Col>
               </Row>
               <Row>
                    <Col className="tile">
                         Diaper
                    </Col>
                    <Col className="tile">
                         Growth
                    </Col>
               </Row>
          </>
     )
}

export default LogPortal;