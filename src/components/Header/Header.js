import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';
import './Header.css';

const Header = () => {
    const [rideInfo, setRideInfo, loggedinUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedinUser);
    const {isSignedIn, name} = loggedinUser;

    return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Riding-Club
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link as={Link} to="/home">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/destination">
							Destination
						</Nav.Link>
						<Nav.Link>Blog</Nav.Link>
						<Nav.Link>Contact</Nav.Link>
						<Nav.Link as={Link} to="/login" className="login-btn">
							{isSignedIn ? name : "Login"}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;