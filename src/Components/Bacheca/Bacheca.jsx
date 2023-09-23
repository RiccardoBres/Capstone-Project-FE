import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bacheca.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { allBeach, getBeach, createComment, getComment, allComment, deleteComment } from '../../States/BeachState';
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
    const [filteredBeaches, setFilteredBeaches] = useState(beaches);

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
    useEffect(() => {
        dispatch(getBeach())
            .catch((error) => {
                console.error('Errore nel recupero delle spiagge:', error);
            });
    }, []); // 

    useEffect(() => {
        setFilteredBeaches(beaches);
    }, [beaches]);


    return (
        <Container fluid className="container-post">
            <div className='intro-bacheca'>
                <h2>Trova la tua meta</h2>
                <em className='intro'>Trova la spiaggia più adatta al tuo Surf e recensisci i posti che hai già avuto fortuna di visitare<br />Scambia interazioni con altri utenti e condividi le incredibili esperienze fatte strada facendo! </em>
            </div>
            <Row className='row-searcher'>
                <Col md={12} lg={6}>
                    <div className="beach-options-container">
                        <Form onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}>
                            <Row className='d-flex justify-content-center'>
                                <Col sm={12} md={4}>
                                    <Form.Group>
                                        <Form.Label>Dove vuoi andare?</Form.Label>
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
                                        <Form.Label>Indica la tua esperienza</Form.Label>
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
                            <Button className="form-button" type="submit">Cerca</Button>
                        </Form>
                    </div>
                </Col>
                <Col className='my-3' md={12} lg={8}>
                    <h3>Ultime pubblicazioni:</h3>
                </Col>
            </Row>
            <Row className='row-posts'>
                <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="beach-container-posts">
                        {filteredBeaches.map((beach) => (
                            <Card key={beach._id} className="card-post">
                                <Card.Img className="card-img-post" src={beach.image} alt={beach.name} />
                                <Card.Title className="card-title-post">{beach.name}</Card.Title>
                                <Card.Body className='p-0'>
                                    <Card.Text className="card-text-post">Località: {beach.location}</Card.Text>
                                    <Card.Text className="card-text-post">Livello: {beach.level}</Card.Text>
                                </Card.Body>
                                <button className='button-details' onClick={() => handleDetails(beach._id)}>Recensioni</button>
                            </Card>
                        ))}
                    </div>
                </Col>
                {selectedCardId &&
                    beaches.map((beach) => (
                        selectedCardId === beach._id && (
                            <Col key={beach.user._id} xs={12} sm={6} md={6} lg={4}>
                                <div className="details-container">
                                    <FontAwesomeIcon className='icon-trash' onClick={() => setSelectedCardId(null)} icon={faTrash} />                                    <div className='profile-details'>
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
                                                        <img src={comment.user[0].avatar} alt="Avatar" />
                                                        <p className='p-0'>di: {comment.user[0].name} {comment.user[0].surname}</p>
                                                    </div>
                                                    <div className='content-review'>
                                                        {comment.user[0]._id === session.decodedSession.id && (
                                                            <button className='delete-button' onClick={() => handleDeleteComment(comment._id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        )}
                                                        <e>{comment.content}</e>
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
