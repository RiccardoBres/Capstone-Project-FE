import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSchools, allSchools, getSchoolsByLocation } from "../../States/SchoolState";
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import Footer from '../../Components/Footer/Footer';
import './School.css';
import AccessRegistration from "../../Components/VolatileComponents/AccessRegistration";

const School = () => {
    const dispatch = useDispatch();
    const schools = useSelector(allSchools) || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const location = params.get('location');
  
    
    const handleSearch = () => {
      const filtered = schools.filter((school) => {
        const query = searchQuery.toLowerCase();
        return school.location.toLowerCase().includes(query);
      });
  
      setFilteredSchools(filtered);
      setCurrentPage(1); // Reimposta la pagina corrente a 1 quando esegui una nuova ricer
    };
  
    useEffect(() => {

      dispatch(getSchools());
    }, [dispatch, location]);
  
    useEffect(() => {
      handleSearch();
    }, [searchQuery, schools]);
  
    const totalPages = Math.ceil(filteredSchools.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const schoolsToShow = filteredSchools.slice(startIndex, endIndex);
  

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
              text= "ciaoo"
            />
          </div>
          {filteredSchools && filteredSchools.length === 0 && (
            <p>Nessuna scuola corrisponde ai criteri di ricerca.</p>
          )}
        </div>
        <Row className='w-100'>
          <div className="container-card-school-page">
            {filteredSchools.map((school) => (
              <Col key={school._id} xs={12} sm={6} md={6} lg={3}>
                <Card className='school-card'>
                  <Card.Img variant='top' src={school.image} />
                  <Card.Body>
                    <Card.Title>{school.name}</Card.Title>
                    <Card.Text>{school.location}</Card.Text>
                    <Card.Text>{school.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
