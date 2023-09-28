import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import { getUserById, isUserLoading, userError } from '../../States/UserState';
import { FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import Footer from '../../Components/Footer/Footer'
import './Profile.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AccessRegistration from "../../Components/VolatileComponents/AccessRegistration"


const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState(null);
    const isLoading = useSelector(isUserLoading);
    const error = useSelector(userError);


    useEffect(() => {
        dispatch(getUserById(userId))
            .then((data) => {
                setUserDetails(data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch, userId]);

    return (
        <>
            <CustomNavbar />
            <AccessRegistration />
            <Container fluid className='container-profile'>
                <Row className='first-row'>
                    <Col sm={12} md={8} lg={10}>
                        <div>
                            {isLoading ? (
                                <p>Caricamento in corso...</p>
                            ) : error ? (
                                <p>Si è verificato un errore: {error}</p>
                            ) : userDetails ? (
                                <div className='container-intro-image'>
                                    <div className='image-name-container'>
                                        <img className="avatar-profile-page" src={userDetails.payload.userById.avatar} alt="image-profile" />
                                        <h3
                                            className='profile-name'>
                                            {userDetails.payload.userById.name} {userDetails.payload.userById.surname}
                                        </h3>
                                    </div>
                                    <div className='email-container'>
                                        <FaEnvelope className='icon-email' />
                                        <p className='mb-0'>{userDetails.payload.userById.email}</p>
                                    </div>
                                    <div className='birthday-container'>
                                        <FaBirthdayCake className='icon-birthday' />
                                        <p className='mb-0'>{userDetails.payload.userById.birthday}</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Col>
                </Row>
                <Row className='main-row'>
                    <Col sm={12} md={12} lg={12}>
                        {userDetails && userDetails.payload.userById.beach.length > 0 ? (
                            <div className='beach-card-container'>
                                <h1 className='text-pubblicazioni'>Pubblicazioni</h1>
                                {userDetails.payload.userById.beach.map((beach) => (
                                    <Card key={beach._id} className='card-profile-user'>
                                        <Card.Img className='card-img' src={beach.image} alt={beach.name} />
                                        <Card.Title className='card-title'>{beach.name}</Card.Title>
                                        <Card.Body>
                                            <Card.Text className='card-text'>Località: {beach.location}</Card.Text>
                                            <Card.Text className='card-text'>Livello: {beach.level}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p>Questo utente non ha nessuna pubblicazione.</p>
                        )}

                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}


export default Profile
