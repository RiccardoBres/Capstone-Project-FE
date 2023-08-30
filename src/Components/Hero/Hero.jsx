import React, { useRef, useEffect, useState } from 'react';
import './Hero.css'; // Assicurati di importare il file CSS corretto
import MiddleCarousel from './MiddleCarousel';
import SurfVideo from './AssetsHero/Surf3.mp4';
import CustomNavbar from '../NavBar/CustomNavbar';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importa anche il componente Button da react-bootstrap

const Hero = () => {
    const [showIntro, setShowIntro] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const introTimeout = setTimeout(() => {
            setShowIntro(true);
        }, 5000);

        const buttonsTimeout = setTimeout(() => {
            setShowButtons(true);
        }, 7000);

        return () => {
            clearTimeout(introTimeout);
            clearTimeout(buttonsTimeout);
        };
    }, []);

    return (
        <div className='video-container'>
            <CustomNavbar />
            <video autoPlay muted className="video-background">
                <source src={SurfVideo} type="video/mp4" />
            </video>
            <Container fluid>
                <Row className='d-flex'>
                    <Col md={6} className={`container-intro ${showIntro ? 'visible' : ''}`}>
                        <em className='title'>
                            Trova la tua meta
                        </em>
                        <br />
                        <p className='intro-video'>Le migliori mete Surfistiche a portata di un click.
                            Programma la tua vacanza ideale e scopri i servizi più adatti a te! <br />
                            Pratica il tuo Surf e trova lo spot più adatto al tuo livello in tutta Europa!</p>
                        <div className={`buttons-container ${showButtons ? 'visible' : ''}`}>
                            <Button variant="dark" className="mr-2">Unisciti alla community</Button>
                            <Button variant="secondary">Programma la tua prossima meta</Button>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hero;
