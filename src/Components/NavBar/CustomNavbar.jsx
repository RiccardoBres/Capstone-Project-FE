<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
>>>>>>> CSS_IMPLEMENTATION
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { faUser, faSignOutAlt, faBookmark, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./CustomNav.css";
import Logo from "./Assets/Surf-Logo-2.jpg";
import ModalLogin from './ModalLogin';
import { logout } from '../../Middleware/ProtectedRoutes';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../Middleware/ProtectedRoutes';
>>>>>>> CSS_IMPLEMENTATION




const CustomNavbar = () => {
<<<<<<< HEAD

    const [showModal, setShowModal] = useState(false);
    const [navbarScrolled, setNavbarScrolled] = useState(false);
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    const [isBachecaVisible, setIsBachecaVisible] = useState(false);
=======
    const session = useSession();
    const [showModal, setShowModal] = useState(false);
    const [navbarScrolled, setNavbarScrolled] = useState(false);
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
>>>>>>> CSS_IMPLEMENTATION


    const handleShowModal = () => {
        setShowModal(true);
    };
<<<<<<< HEAD
    const handleLogout = () => {
        logout();
        setIsBachecaVisible(false);
=======

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
        window.location.reload();
    }
    const handleShareExperiencePage = (userId) => {
        navigate(`/shareExperience/${userId}`);
>>>>>>> CSS_IMPLEMENTATION
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setNavbarScrolled(true);
            } else {
                setNavbarScrolled(false);
            }
<<<<<<< HEAD
            if (userLoggedIn) {
                setIsBachecaVisible(true);
            } else {
                setIsBachecaVisible(false);
            }
=======
>>>>>>> CSS_IMPLEMENTATION
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [userLoggedIn]);

    return (
        <>
            <Navbar className={`nav-background ${navbarScrolled ? 'navbar-scrolled' : ''}`} expand="lg">
                <Container className='align-element'>
                    <img className='logo-immage-nav' src={Logo} alt="Logo" />
                    <em className='title-nav' href="/">Surf On</em>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='nav-links' href="/">Home</Nav.Link>
                            <Nav.Link onClick={handleShowModal} className='nav-links'>Login</Nav.Link>
<<<<<<< HEAD
                            {isBachecaVisible && <Nav.Link className='nav-links' as={NavLink} to="/posts">Bacheca</Nav.Link>}
                        </Nav>
                        <Nav>
                            <NavDropdown title={<FontAwesomeIcon icon={faUser} id="account-dropdown" className='user-icon' />}>
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
                                        onClick={handleLogout}
                                        id="account-dropdown"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Logout
                                    </p>
                                </div>
                            </NavDropdown>
=======
                        </Nav>
                        <Nav>
                            {session && session.decodedSession && (
                                <NavDropdown
                                    title={<em className='user-name-nav'>{session.decodedSession.name}{session.decodedSession.surname}</em>}
                                    id="account-dropdown"
                                    show={dropdownOpen}
                                    onToggle={(isOpen) => setDropdownOpen(isOpen)}
                                >
                                    <div className="custom-dropdown">
                                        <p 
                                        onClick={() => session.decodedSession && handleShareExperiencePage(session.decodedSession.id)}
                                        className='drop-title'>
                                            <FontAwesomeIcon icon={faUserCircle} className="logout-icon" /> Vai al tuo profilo
                                        </p>
                                        <p className='drop-title'>
                                            <FontAwesomeIcon icon={faBookmark} className="logout-icon" /> Post salvati
                                        </p>
                                        <p
                                            className='drop-title'
                                            onClick={handleLogout}
                                            id="account-dropdown"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Logout
                                        </p>
                                    </div>                  </NavDropdown>
                            )}
>>>>>>> CSS_IMPLEMENTATION
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
<<<<<<< HEAD
            <ModalLogin showModal={showModal} setShowModal={setShowModal} />
        </>

=======
            <ModalLogin showModal={showModal} setShowModal={setShowModal} setUserData={setUserData} />
        </>


>>>>>>> CSS_IMPLEMENTATION
    )
}

export default CustomNavbar;
