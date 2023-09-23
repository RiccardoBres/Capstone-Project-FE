import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ShareExperience.css';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import Footer from '../../Components/Footer/Footer';
import { getUserById, isUserLoading, userError } from '../../States/UserState';
import { FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import { postBeach } from '../../States/BeachState';
import { useSession } from '../../Middleware/ProtectedRoutes';
import AccessRegistration from '../../Components/VolatileComponents/AccessRegistration';


const ShareExperience = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState(null);
    const isLoading = useSelector(isUserLoading);
    const error = useSelector(userError);
    const session = useSession();


    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: null,
        type: '',
        level: '',
        user: session.decodedSession.id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postBeach(formData))
            .then((data) => {
               
                dispatch(getUserById(userId))
                    .then((userData) => {
                        setUserDetails(userData);
                        cleaner();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const cleaner = () => {
        setFormData({
            name: '',
            location: '',
            image: null,
            type: '',
            level: '',
            user: session.decodedSession.id,
        });
    };

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
            <AccessRegistration/>
            <CustomNavbar />
            <Container className="share-experience-form">
                <Row className='profile-row'>
                    <Col className='p-0' sm={12} md={8} lg={4}>
                        <div >
                            {isLoading ? (
                                <p>Caricamento in corso...</p>
                            ) : error ? (
                                <p>Si è verificato un errore: {error}</p>
                            ) : userDetails ? (
                                <div className='profile-page-container'>
                                    <div className='image-name-container'>
                                        <img className="image-profile" src={userDetails.payload.userById.avatar} alt="image-profile" />
                                        <h3
                                            className='profile-name'>
                                            {userDetails.payload.userById.name}{userDetails.payload.userById.surname}
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
                    <Col sm={4} md={4} lg={6}>
                        <div className="beach-card-container-bcc">
                            <div className='beach-card-bcc'>
                                {userDetails && userDetails.payload.userById.beach.length > 0 ? (
                                    userDetails.payload.userById.beach.map((beach) => (
                                        <Card key={beach._id} className='card'>
                                            <Card.Img className='card-img' src={beach.image} alt={beach.name} />
                                            <Card.Title className='card-title'>{beach.name}</Card.Title>
                                            <Card.Body>
                                                <Card.Text className='card-text'>Località: {beach.location}</Card.Text>
                                                <Card.Text className='card-text'>Livello: {beach.level}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <p>Questo utente non ha nessuna pubblicazione.</p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='opaque-background'>
                    <Col sm={4} md={4} lg={8}>
                        <div className='form-container'>
                            <Form 
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLocalita">
                                    <Form.Label>Località</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formFileImmagine">
                                    <Form.Label>File Immagine</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formTipo">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLivello">
                                    <Form.Label>Livello</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit">Condividi</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ShareExperience;

