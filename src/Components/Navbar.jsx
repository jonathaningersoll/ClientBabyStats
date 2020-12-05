import React from 'react';
import {
     Button,
     Navbar,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
} from 'reactstrap';
import {
     Link
} from 'react-router-dom';

export default class Sitebar extends React.Component{
     constructor(props){
          super(props)
     }

     render(){
          return(
               <Navbar color="light" light expand="md" className="navigator">
                    <Link to="/">
                         <NavbarBrand>Home</NavbarBrand>
                    </Link>
                    {
                         this.props.token ? 
                         <>
                              <Nav className="ml-auto" navbar>
                                   <NavItem>
                                        <Button onClick={this.props.clickLogout}>Logout</Button>
                                   </NavItem>
                              </Nav>
                         </>
                         : <></>
                    }
                    {
                         this.props.role === "Admin" ? 
                              <Link to="/Admin">
                                   <NavLink>Admin</NavLink>
                              </Link>
                              :
                              <></>
                    }
                    <Nav className="ml-auto">
                         
                    </Nav>
               </Navbar>

          )
     }
}