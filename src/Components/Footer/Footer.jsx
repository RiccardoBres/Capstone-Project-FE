import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Logo from "../NavBar/Assets/Surf-Logo-2.jpg"
import './Footer.css'; // Assicurati di collegare il tuo file CSS per lo stile del footer

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col xs={12} md={4} className="footer-section">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <p>Riccardo Bresolin</p>
                                <div className='d-flex justify-content-center gap-3'>
                                    <FaEnvelope />
                                    <p>riccardoBresolin97@libero.it</p>
                                </div>
                                <div className='d-flex gap-3 justify-content-center'>
                                    <FaPhone />
                                    <p>+351 913 436264</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="footer-section">
                        <div className="logo">
                            <img
                                src={Logo}
                                alt="Logo"
                                className='logo-img' />
                            <em>SurfOn &copy; <br/>2023</em>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="footer-section">
                        <div className="social-icons">
                            <FaLinkedin />
                            <FaWhatsapp />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
