import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bacheca.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faMapMarker, faSchool, faArrowAltCircleLeft, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { allBeach, getBeach, createComment, getComment, allComment, deleteComment } from '../../States/BeachState';
import { addSavedBeach, removeSavedBeach, savedBeaches } from '../../States/UserState'
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '../../Middleware/ProtectedRoutes';

const Bacheca = () => {
    const navigate = useNavigate();
    const session = useSession();
    const [selectedCardId, setSelectedCardId] = useState(null);
    const dispatch = useDispatch();
    const beaches = useSelector(allBeach);
    const selectedBeachComments = useSelector(allComment)?.comments || [];
    const [newComment, setNewComment] = useState('');
    const beachOptions = ['Francia', 'Italia', 'Portogallo', 'Spagna'];
    const levelOptions = ['Principiante', 'Intermedio', 'Avanzato']
    const [destination, setDestination] = useState('');
    const [level, setLevel] = useState('');
    const [filteredBeaches, setFilteredBeaches] = useState([]);
    const refScroll = useRef(null);
    const refScrollRevers = useRef(null);
    const savedBeach = useSelector(savedBeaches);
    const savedBeachMemo = useMemo(() => new Set(savedBeach), [savedBeach]);


    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleDetails = (beachId) => {
        setSelectedCardId(beachId);
        dispatch(getComment(beachId))
            .catch((error) => {
                console.error('Errore nel recupero dei commenti:', error);
            });
    };

    const handleCommentSubmit = () => {
        if (!newComment || !selectedCardId) {
            return;
        }

        dispatch(createComment({ content: newComment, beachId: selectedCardId }))
            .then(() => {
                setNewComment('');
                dispatch(getComment(selectedCardId));
            })
            .catch((error) => {
                console.error('Errore nell\'invio del commento:', error);
            });
    };

    const handleAuthorClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleDeleteComment = (commentID) => {
        dispatch(deleteComment(commentID))
            .then(() => {
                dispatch(getComment(selectedCardId));
            })
            .catch((error) => {
                console.error('Errore nella cancellazione del commento:', error);
            });
    }
    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };
    const handleFilterSubmit = () => {
        let filteredResult = [...beaches];
        if (destination) {
            filteredResult = filteredResult.filter((beach) =>
                beach.location.toLowerCase().includes(destination.toLowerCase())
            );
        }
        if (level) {
            filteredResult = filteredResult.filter((beach) =>
                beach.level.toLowerCase() === level.toLowerCase()
            );
        }
        setFilteredBeaches(filteredResult);
    };
    const handleSchoolPage = (location) => {
        navigate(`/School/location/${location}`);
    };

    const handleSavePost = (beachId) => {
        console.log('Aggiunta spiaggia ai preferiti:', beachId);
        if (!savedBeach.includes(beachId)) {
            dispatch(addSavedBeach(beachId));
        } else {
            console.log('Spiaggia già nei preferiti:', beachId);
        }
    };

    const handleRemoveSavedBeach = (beachId) => {
        console.log('Rimozione spiaggia dai preferiti - beachId:', beachId);
        dispatch(removeSavedBeach(beachId));
        console.log(savedBeach);
    };



    useEffect(() => {
        console.log(beaches);
        dispatch(getBeach())
            .catch((error) => {
                console.error('Errore nel recupero delle spiagge:', error);
            });
    }, []);

    const scrollToElement = () => {
        if (refScroll.current) {
            refScroll.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToElementRevers = () => {
        if (refScrollRevers.current) {
            refScrollRevers.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        setFilteredBeaches(beaches);
    }, [beaches]);


    return (
        <Container fluid className="container-post">
            <div className="light-section">
                <div className='intro-bacheca'>
                    <h2 ref={refScrollRevers}>Trova la tua meta</h2>
                    <em className='intro-bacheca'>Trova la spiaggia più adatta al tuo Surf e recensisci i posti che hai già avuto fortuna di visitare<br />Scambia interazioni con altri utenti e condividi le incredibili esperienze fatte strada facendo! </em>
                </div>
                <Row className='row-searcher'>
                    <Col md={12} lg={8}>
                        <div className="beach-options-container">
                            <Form onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}>
                                <Row className='d-flex justify-content-center'>
                                    <Col sm={12} md={4}>
                                        <Form.Group>
                                            <Form.Label className='search-title'>Dove vuoi andare?</Form.Label>
                                            <Form.Control as="select" className='form-level-destination' value={destination} onChange={handleDestinationChange}>
                                                <option value="">Tutte le destinazioni</option>
                                                {beachOptions.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <Form.Group>
                                            <Form.Label className='search-title'>Indica la tua esperienza</Form.Label>
                                            <Form.Control className='form-level-destination' as="select" value={level} onChange={handleLevelChange}>
                                                <option value="">Qualsiasi</option>
                                                {levelOptions.map((level, index) => (
                                                    <option key={index} value={level}>
                                                        {level}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <button className="button-details">Cerca</button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row className='row-posts'>
                <Col className='my-3 text-white' md={12} lg={8}>
                    <h1>Ultime pubblicazioni:</h1>
                </Col>
                <Col xs={12} sm={6} md={6} lg={10}>
                    <div className="beach-container-posts">
                        {Array.isArray(filteredBeaches) && filteredBeaches.length > 0 ? (
                            filteredBeaches.map((beach) => (
                                <Card key={beach._id} className="card-post">
                                    <Card.Img
                                        className="card-img-post" src={beach.image} alt={beach.name} />
                                    <Card.Title className="card-title-post">{beach.name}</Card.Title>
                                    <div className="favorite-icons">
                                        <FontAwesomeIcon
                                            onClick={() => savedBeachMemo.has(beach._id) ? handleRemoveSavedBeach(beach._id) : handleSavePost(beach._id)}
                                            className={savedBeachMemo.has(beach._id) ? 'favorite-icon-selected' : 'favorite-icon'}
                                            icon={savedBeachMemo.has(beach._id) ? faHeartBroken : faHeart}
                                        />
                                    </div>
                                    <Card.Body className='p-0'>
                                        <Card.Text className="card-text-post">
                                            <FontAwesomeIcon icon={faMapMarker} /> Località: {beach.location}
                                        </Card.Text>
                                        <Card.Text className="card-text-post">
                                            <FontAwesomeIcon icon={faSchool} /> Livello: {beach.level}
                                        </Card.Text>
                                        <Card.Text className="card-text-post">
                                            <div className="post-info-date">
                                                {beach.user && (
                                                    <img className="profile-image" src={beach.user.avatar} alt="user image" />
                                                )}
                                                {<p className="card-footer-text">Pubblicato il: {new Date(beach.createdAt).toLocaleDateString()}</p>}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                    <div className='buttons-school-reviews'>
                                        <button className='button-details-card' onClick={() => { handleDetails(beach._id); scrollToElement(); }}>Recensioni</button>
                                        <button
                                            className='button-details-card'
                                            onClick={() => handleSchoolPage(beach.location)}
                                        >
                                            <Link className='decoration-none' to={`/School/location?location=${beach.location}`}>
                                                Scuole nelle vicinanze
                                            </Link>
                                        </button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className='color-dark'>Nessuna spiaggia trovata</p>
                        )}
                    </div>
                </Col>
                {selectedCardId && beaches &&
                    beaches.map((beach) => (
                        selectedCardId === beach._id && (
                            <Col key={beach.user._id} xs={12} sm={6} md={6} lg={8} ref={refScroll}>
                                <div className="details-container">
                                    <FontAwesomeIcon
                                        className='icon-trash'
                                        onClick={() => {
                                            setSelectedCardId(null);
                                            scrollToElementRevers();
                                        }}
                                        icon={faArrowAltCircleLeft}
                                    />
                                    <div className='profile-details'>
                                        <img className="profile-image" src={beach.user.avatar} alt="user image" />
                                        <a
                                            onClick={() => handleAuthorClick(beach.user._id)}
                                            className="user-name"
                                        >
                                            Pubblicato da {beach.user.name} {beach.user.surname}
                                        </a>
                                    </div>
                                    <div className="comment-container">
                                        <em className="review">Recensioni</em>
                                        {selectedBeachComments.length > 0 ? (
                                            selectedBeachComments.map((comment) => (
                                                <div key={comment._id} className="comment-section">
                                                    <div className="comment-footer">
                                                        <div>
                                                            <img src={comment.user[0].avatar} alt="Avatar" />
                                                            <p className='p-0'>di {comment.user[0].name} {comment.user[0].surname}:</p>
                                                        </div>
                                                        <div className='content-review'>
                                                            {comment.user[0]._id === session.decodedSession.id && (
                                                                <button className='delete-button' onClick={() => handleDeleteComment(comment._id)}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            )}
                                                            <e>{comment.content}</e>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))
                                        ) : (
                                            <p>Nessuna recensione presente</p>
                                        )}
                                        <div className="new-comment-container">
                                            <input
                                                type="text"
                                                placeholder="Aggiungi una recensione..."
                                                value={newComment}
                                                onChange={handleCommentChange}
                                            />
                                            <button onClick={handleCommentSubmit}>
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    ))}
            </Row>
            <Row>
                <Col md={8} lg={9}>
                    <div className="container-upload"></div>
                </Col>
            </Row>
        </Container>
    );
};

export default Bacheca;
