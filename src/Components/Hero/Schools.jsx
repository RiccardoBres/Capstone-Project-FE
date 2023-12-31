import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSchools, allSchools, isLoading } from '../../States/SchoolState';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Logo from './AssetsHero/woman-goes-surfing-logo.jpg'
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Hero.css'

const CarouselComponent = () => {
    const dispatch = useDispatch();
    const schools = useSelector(allSchools);
    const loading = useSelector(isLoading);


    useEffect(() => {
        dispatch(getSchools());
        console.log(schools);
    }, []);

    const groupsOfThree = [];
    if (schools && schools.length > 0) {
        for (let i = 0; i < schools.length; i += 3) {
            groupsOfThree.push(schools.slice(i, i + 3));
        }
    }

    return (
        <Container fluid className='carousel-container'>
            <div>
                <img
                    className='logo-school'
                    src={Logo}
                    alt="Immagine logo scuola surf"
                />
            </div>
            <p className='title-school'>Trova la scuola che più fa al caso tuo!</p> <br />
            <p className='intro'>Contatta il tuo istruttore ed organizzati al meglio.</p>
            <hr className='color-light'></hr>
            <Row className='mb-5 d-flex justify-content-center align-items-center '>
                <Col lg={12} md={12} xs={12} className='col-carousel-and-text'>
                    <Carousel indicators={false} prevLabel="" nextLabel="">
                        {loading && (
                            <div className="loading-spinner-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-impaired">Caricamento...</span>
                                </div>
                            </div>
                        )}
                        {groupsOfThree &&
                            groupsOfThree.map((group, index) => (
                                <Carousel.Item key={index}>
                                    <div className='d-flex justify-content-center align-items-center gap-1'>
                                        {group.map((school) => (
                                            <div key={school._id} className="card-container col-lg-4 col-md-6 col-sm-12 col-12">
                                                <div className="card-image">
                                                    <img
                                                        className='card-image'
                                                        src={school.image}
                                                        alt={school.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-title">{school.name}</div>
                                                </div>
                                                <div className="color-dark">
                                                    <FaMapMarkerAlt /> 
                                                </div>
                                                <div className="card-text">{school.address}</div>
                                                <div className="card-text">{school.location}</div>
                                                <Link className='color-dark' to={`/SchoolDetails/${school._id}`}>Visualizza dettagli</Link>
                                            </div>
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={6} xs={12} className='d-flex justify-content-center'>
                    <div className='text-container'>
                        <p className='intro-school my-3'>
                            Se siete appassionati di onde e avete sempre sognato di cavalcare il mare, siete nel posto giusto. <br /> La nostra piattaforma vi offre un elenco accurato e dettagliato delle scuole di surf più autentiche e competenti nella vostra area. <br />
                            Che siate principianti entusiasti o surfisti esperti in cerca di nuove sfide, il nostro servizio vi connetterà alle scuole che offrono lezioni coinvolgenti e istruttori esperti.<br />  Preparatevi a tuffarvi in un'avventura mozzafiato sull'oceano, imparando le tecniche fondamentali o perfezionando il vostro stile con le migliori scuole di surf a portata di clic.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CarouselComponent;

