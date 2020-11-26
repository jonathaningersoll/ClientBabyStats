import React from 'react';
import {
     Button,
     // Collapse,
     Navbar,
     NavbarBrand,
     Nav,
     NavItem,
     // NavLink,
     // NavbarText
} from 'reactstrap';

function Sitebar(props) {

     return(
          <Navbar color="light" light expand="md" className="navigator">
               <NavbarBrand>Home</NavbarBrand>
               {
                    props.token ? 
                    <>
                         <Nav className="ml-auto" navbar>
                              <NavItem>
                                   <Button onClick={props.clickLogout}>Logout</Button>
                              </NavItem>
                         </Nav>
                    </>
                    : <></>
               }
               <Nav className="ml-auto">
                    
               </Nav>
          </Navbar>
     )
}

export default Sitebar