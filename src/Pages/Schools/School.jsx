import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, Link } from 'react-router-dom';
import { getSchools, allSchools, getSchoolsByLocation, schoolsByLocation } from "../../States/SchoolState";
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import Footer from '../../Components/Footer/Footer';
import './School.css';
import AccessRegistration from "../../Components/VolatileComponents/AccessRegistration";


const School = () => {
  const dispatch = useDispatch();
  const { location } = useParams();
  const schools = useSelector(allSchools) || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedSchools, setDisplayedSchools] = useState([]);
  const [allSchool, setAllSchool] = useState(false);
  const [visibleSchools, setVisibleSchools] = useState([]);
  const schoolByLocation = useSelector(schoolsByLocation)?.schools;
  const pageSize = 8;


  useEffect(() => {
    if (allSchool) {
      setVisibleSchools(schools);
      setSearchQuery("");
    } else if (schoolByLocation) {
      setVisibleSchools(schoolByLocation);
    }
  }, [allSchool, schools, schoolByLocation]);

  useEffect(() => {
    if (location) {
      const formattedLocation = location.split(',')[0];
      dispatch(getSchoolsByLocation(formattedLocation));
      console.log(location, schoolsByLocation);
    }
  }, [dispatch, location]);

  const handleAllSchool = () => {
    setAllSchool(true);

  }

  useEffect(() => {
    const filtered = visibleSchools.filter((school) => {
      const query = searchQuery.toLowerCase();
      return query === '' || school.location.toLowerCase().includes(query);
    });
    setDisplayedSchools(filtered);
    setCurrentPage(1);
  }, [searchQuery, visibleSchools]);

  const totalPages = Math.ceil(displayedSchools?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <>
      <AccessRegistration />
      <CustomNavbar />
      <Container className='container-school-page'>
        <div className='search-section'>
          <em>
            Qui potete trovare le migliori scuole
            di surf vicino alla vostra meta. Utilizzate la ricerca per trovare le scuole nella
            vostra città preferita o inserite una località specifica.
          </em>
          <div className='search-input'>
            <input
              type='text'
              placeholder='Quale sarà la tua prossima meta?'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => handleAllSchool()}>Visualizza tutte</button>
        </div>
        <Row className='w-100'>
          <div className="container-card-school-page">
            {displayedSchools?.length > 0 ? (
              displayedSchools.slice(startIndex, endIndex).map((school) => (
                <Col key={school._id} xs={12} sm={6} md={6} lg={3}>
                  <Card className='school-card'>
                    <Card.Img variant='top' src={school.image} />
                    <Card.Body>
                      <Card.Title>{school.name}</Card.Title>
                      <Card.Text>{school.address}</Card.Text>
                      <Card.Text>{school.location}</Card.Text>
                      <Link className='go-to-details-school' to={`/SchoolDetails/${school._id}`}><p>Visualizza dettagli</p></Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div>
                <p>Nessuna scuola nelle vicinanze</p>
              </div>
            )}
          </div>
        </Row>
        <div className="pagination">
          <span>
            Pagina {currentPage} di {totalPages}
          </span>
          <div className="buttons-pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Pagina precedente
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Pagina successiva
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}



export default School;

