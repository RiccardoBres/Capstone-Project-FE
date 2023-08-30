import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { faUser, faSignOutAlt, faBookmark, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./CustomNav.css";
import Logo from "./Assets/Surf-Logo-2.jpg";
import ModalLogin from './ModalLogin';
import { logout } from '../../Middleware/ProtectedRoutes';




const CustomNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [navbarScrolled, setNavbarScrolled] = useState(false);
    const [navbarScrolledMiddle, setNavbarScrolledMiddle] = useState(false);


    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleLogout = () => {
        logout();
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setNavbarScrolled(true);
            } else {
                setNavbarScrolled(false);
            }

            if (window.scrollY > 1000) {
                setNavbarScrolledMiddle(true);
            } else {
                setNavbarScrolledMiddle(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar className={`nav-background ${navbarScrolled ? 'navbar-scrolled' : ''} ${navbarScrolledMiddle ? 'navbar-scrolled-middle' : ''}`} expand="lg">
                <Container className='align-element'>
                    <img className='logo-immage-nav' src={Logo} alt="Logo" />
                    <em className='title-nav' href="/">Surf On</em>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='nav-links' href="/">Home</Nav.Link>
                            <Nav.Link onClick={handleShowModal} className='nav-links'>Login</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<FontAwesomeIcon icon={faUser} id="account-dropdown" />}>
                                <div className="custom-dropdown">
                                    <p
                                        className='drop-title'
                                    >
                                        <FontAwesomeIcon icon={faUserCircle} className="logout-icon" /> Vai al tuo profilo
                                    </p>
                                    <p
                                        className='drop-title'
                                    >
                                        <FontAwesomeIcon icon={faBookmark} className="logout-icon" /> Post salvati
                                    </p>
                                    <p
                                        className='drop-title'
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" onClick={handleLogout} /> Logout
                                    </p>
                                </div>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalLogin showModal={showModal} setShowModal={setShowModal} />
        </>

    )
}

export default CustomNavbar;
