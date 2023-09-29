import { useEffect, useState } from 'react';
import './Beach.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt, faWater } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { allBeach, getBeach, isLoading } from '../../States/BeachState';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Hero/AssetsHero/woman-goes-surfing-logo.jpg'
import { useSession } from '../../Middleware/ProtectedRoutes';

const HeroBeach = ({ userData }) => {
    const session = useSession();
    const dispatch = useDispatch();
    const beaches = useSelector(allBeach);
    const loading = useSelector(isLoading);
    const navigate = useNavigate();



    const handleAuthorClick = (userId) => {
        navigate(`/profile/${userId}`);
    };
    const handleShareExperiencePage = (userId) => {
        navigate(`/shareExperience/${userId}`);
    }

    useEffect(() => {
        dispatch(getBeach());
    }, []);


    return (
        <>
            <Container fluid>
                <Row className='beach-container'>
                    <Col lg={12} md={6} xs={12} className='order-lg-1 beach-description'>
                        <div className='container-Logo'>
                            <img
                                className='logo'
                                src={Logo}
                                alt="Immagine logo scuola surf"
                            />
                        </div>
                        <p className='beach-title'>
                            Condividi le tue esperienze <br />
                            Esprimi la tua passione per il surf e connettiti con una community appassionata di surfisti di tutto il mondo.
                            <hr className='hr-beach' />
                        </p>
                        <p className='intro-beach'>
                            La nostra pagina ti consente di condividere le tue avventure in spiaggia, aggiungendo dettagli sulle spiagge che hai esplorato e lasciando recensioni sulle tue esperienze. Hai trovato una spiaggia con onde perfette? Vuoi condividere le tue migliori sessioni di surf? Carica foto e descrizioni delle tue giornate in acqua, aggiungi informazioni sulle condizioni dell'onda e crea una traccia indelebile delle tue avventure.
                        </p>
                        <div className="buttons-container">
                            <Link to='/signUp'>
                                <Button variant="dark" className="btn-community">Entra a far parte della community</Button>
                            </Link>
                            <Button
                                onClick={() => session.decodedSession && handleShareExperiencePage(session.decodedSession.id)}
                                variant="secondary"
                                className="btn-share"
                            >
                                Condividi una tua esperienza
                            </Button>
                        </div>
                    </Col>
                    <Col lg={4} md={6} xs={12} className='order-lg-2 beach-list'>
                        <Carousel
                            className='carousel-beach'
                            indicators={false}
                            controls={true}
                            prevLabel=""
                            nextLabel="">
                            {loading && <div className="loading-spinner-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {beaches && Array.isArray(beaches) && beaches.length > 0 ? (
                                beaches.map((beach) => (
                                    <Carousel.Item key={beach._id}>
                                        <div className="beach-card">
                                            <div className="beach-card__image">
                                                <img src={beach.image} alt={beach.name} />
                                            </div>
                                            <div className="beach-card__content">
                                                <div className="beach-card__title">{beach.name}</div>
                                                <div className="beach-card__info">
                                                    <FontAwesomeIcon icon={faLevelUpAlt} />
                                                    <div className="beach-card__level">{beach.level}</div>
                                                    <FontAwesomeIcon icon={faWater} />
                                                    <div className="beach-card__type">{beach.type}</div>
                                                </div>
                                                {beach.user && <div className="footer-beach-card">
                                                    <a
                                                        onClick={() => handleAuthorClick(beach.user._id)}
                                                        className="user-name">Pubblicato da {beach.user.name}{beach.user.surname}</a>
                                                </div>}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                ))
                            ) : (
                                <Carousel.Item>
                                    <p>Non ci sono spiagge disponibili al momento.</p>
                                </Carousel.Item>
                            )}

                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HeroBeach;
