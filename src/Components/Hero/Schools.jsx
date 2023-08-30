import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchools, allSchools, isLoading } from '../../States/SchoolState';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Logo from './AssetsHero/woman-goes-surfing-logo.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Hero.css'

const CarouselComponent = () => {
    const dispatch = useDispatch();
    const schools = useSelector(allSchools);
    const loading = useSelector(isLoading);


    useEffect(() => {
        dispatch(getSchools());
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
                    className='logo'
                    src={Logo}
                    alt="Immagine logo scuola surf"
                />
            </div>
            <em className='title'>Trova la scuola che più fa al caso tuo!</em> <br />
            <em className='intro'>Contatta il tuo istruttore ed organizzati al meglio.</em>
            <hr className='color-light'></hr>
            <Row className='d-flex align-items-center justify-content-center mb-5'>
                <Col lg={8} md={6} xs={12} className='col-carousel-and-text'>
                    <Carousel indicators={true} prevLabel="" nextLabel="">
                    {loading && <div className="loading-spinner-container">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                        {groupsOfThree && groupsOfThree.map((group, index) => (
                            <Carousel.Item key={index}>
                                <div className='d-flex gap-2 my-5 justify-content-center'>
                                    {group.map(school => (
                                        <div key={school.id} className="card-container">
                                            <div className="card-image">
                                                <img src={school.image} alt={school.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>
                                            <div className="card-content">
                                                <div className="card-title">{school.name}</div>
                                            </div>
                                            <div className="card-text">{school.address}</div>
                                            <div className="card-text">{school.location}</div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className='text-container'>
                        <em className='intro'>
                            Se siete appassionati di onde e avete sempre sognato di cavalcare il mare, siete nel posto giusto. La nostra piattaforma vi offre un elenco accurato e dettagliato delle scuole di surf più autentiche e competenti nella vostra area. <br />
                            Che siate principianti entusiasti o surfisti esperti in cerca di nuove sfide, il nostro servizio vi connetterà alle scuole che offrono lezioni coinvolgenti, istruttori esperti e un ambiente accogliente per farvi vivere l'emozione del surf in modo sicuro. Preparatevi a tuffarvi in un'avventura mozzafiato sull'oceano, imparando le tecniche fondamentali o perfezionando il vostro stile con le migliori scuole di surf a portata di clic.
                        </em>
                    </div>
                </Col>
            </Row>
        </Container>
        /*       <>
                  <Container fluid className='carousel-container'>
                      <div>
                          <img
                              className='logo'
                              src={Logo}
                              alt="Immagine logo scuola surf"
                          />
                      </div>
                      <em className='title'>Trova la scuola che più fa al caso tuo!</em> <br />
                      <em className='intro'>Contatta il tuo istruttore ed organizzati al meglio.</em>
                      <hr className='color-light'></hr>
                      <Row className='d-flex align-items-center justify-content-center'>
                          <Col lg={8} md={6} xs={12} className='col-carousel-and-text'>
                              <Carousel
                                  showThumbs={false}
                                  showStatus={false}
                                  showIndicators={true}
                                  showArrows={true}
                                  infiniteLoop
                              >
                                  {groupsOfThree.map((group, index) => (
                                      <div key={index} className='d-flex gap-2 my-5 justify-content-center'>
                                          {group.map(school => (
                                              <div key={school.id} className="card-container">
                                                  <div className="card-image">
                                                      <img src={school.image} alt={school.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                  </div>
                                                  <div className="card-content">
                                                      <div className="card-title">{school.name}</div>
                                                  </div>
                                                  <div className="card-text">{school.address}</div>
                                                  <div className="card-text">{school.location}</div>
                                              </div>
                                          ))}
                                      </div>
                                  ))}
                              </Carousel>
                              <div className='text-center container-p'>
                                  <em className='intro'>
                                      Se siete appassionati di onde e avete sempre sognato di cavalcare il mare, siete nel posto giusto. La nostra piattaforma vi offre un elenco accurato e dettagliato delle scuole di surf più autentiche e competenti nella vostra area. <br />
                                      Che siate principianti entusiasti o surfisti esperti in cerca di nuove sfide, il nostro servizio vi connetterà alle scuole che offrono lezioni coinvolgenti, istruttori esperti e un ambiente accogliente per farvi vivere l'emozione del surf in modo sicuro. Preparatevi a tuffarvi in un'avventura mozzafiato sull'oceano, imparando le tecniche fondamentali o perfezionando il vostro stile con le migliori scuole di surf a portata di clic.
                                  </em>
                              </div>
                          </Col>
                      </Row>
                  </Container >
              </> */
    );
};

export default CarouselComponent;

