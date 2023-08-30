import { useEffect } from 'react';
import './Beach.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { allBeach, getBeach, isLoading } from '../../States/BeachState';
import { FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../Hero/AssetsHero/woman-goes-surfing-logo.jpg'

const HeroBeach = () => {
    const dispatch = useDispatch();
    const beaches = useSelector(allBeach);
    const loading = useSelector(isLoading);


    useEffect(() => {
        dispatch(getBeach());
    }, []);

    return (
        <Container fluid>
            <Row className='beach-container'>
                <div className='container-Logo'>
                    <img
                        className='logo'
                        src={Logo}
                        alt="Immagine logo scuola surf"
                    />
                </div>
                <em className='beach-title'>
                    Condividi le tue esperienze
                    <hr className='color-light' />
                </em>
                <Col lg={6} className='beach-description'>
                    <em className='intro-beach'>
                        Esprimi la tua passione per il surf e connettiti con una community appassionata di surfisti di tutto il mondo. <br />
                    </em>
                    <em className='intro'>
                        La nostra pagina ti consente di condividere le tue avventure in spiaggia, aggiungendo dettagli sulle spiagge che hai esplorato e lasciando recensioni sulle tue esperienze. Hai trovato una spiaggia con onde perfette? Vuoi condividere le tue migliori sessioni di surf? Carica foto e descrizioni delle tue giornate in acqua, aggiungi informazioni sulle condizioni dell'onda e crea una traccia indelebile delle tue avventure.
                    </em>
                    <div className="buttons-container">
                        <Link to='/signUp'>
                            <button className="btn-community">Entra a far parte della community</button>
                        </Link>
                        <button className="btn-share">Condividi una tua esperienza</button>
                    </div>
                </Col>
                <Col lg={6} className='beach-list'>
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
                        {beaches && beaches.map((beach) => (
                            <Carousel.Item key={beach._id}>
                                <div className="beach-card">
                                    <div className="beach-card__image">
                                        <img src={beach.image} alt={beach.name} />
                                    </div>
                                    <div className="beach-card__content">
                                        <div className="beach-card__title">{beach.name}</div>
                                        <div className="beach-card__info">
                                            <div className="beach-card__level">{beach.level}</div>
                                            <div className="beach-card__type">{beach.type}</div>
                                        </div>
                                        <div className="beach-card__comment">
                                            <FaComment className='color-dark' />
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default HeroBeach;
