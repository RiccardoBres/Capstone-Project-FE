import {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolsById, schoolDetails } from '../../States/SchoolState';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import Footer from '../../Components/Footer/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const SchoolDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const school = useSelector(schoolDetails).school;

  useEffect(() => {
    if (id) {
      dispatch(getSchoolsById(id));
    }
  }, [dispatch, id]);
  return (
    <>
    <CustomNavbar/>
    <Container className="school-details-container">
        {school ? (
          <Row className='row-school-details'>
            <h1 className='title-school-details'>{school.name}</h1>
            <Col lg={6} md={6} xs={12} className='d-flex align-items-center justify-content-center'>
              <div className="school-info-details">
                <h3>Descrizione</h3>
                {school.description? <p>{school.description}</p>: <p>nessuna descrizione disponibile</p>}
                <h3>Contatti</h3>
                <ul className='p-1'>
                  <li className='py-2'>
                    <FontAwesomeIcon icon={faMapMarker} className="icon-details-school mx-1" />
                    {school.address}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} className="icon-details-school mx-1" />
                    {school.email}
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12} >
              <Card className="card-school-details">
                <Card.Img variant="top" src={school.image} />
                <Card.Body>
                  <Card.Title>{school.name}</Card.Title>
                  <Card.Text>{school.location}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Caricamento in corso...</p>
        )}
      </Container>
    <Footer/>
    </>
  );
};

export default SchoolDetails;


