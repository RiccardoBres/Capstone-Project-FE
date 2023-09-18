import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import CustomNavbar from '../Components/NavBar/CustomNavbar'
import Footer from '../Components/Footer/Footer';
import { createUser } from '../States/UserState';
import ModalLogin from '../Components/NavBar/ModalLogin';
import { useNavigate } from 'react-router-dom';
import { createSchool } from '../States/SchoolState';
import './RegistrationPage.css'


const RegistrationPage = () => {

    const navigate = useNavigate();
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({});
    const [formDataSchool, setFormDataSchool] = useState({});
    const [school, setSchool] = useState(false);
    const [person, setPerson] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleFormPerson = () => {
        setPerson(true);
        setSchool(false);
    }
    const handleFormSchool = () => {
        setSchool(true);
        setPerson(false);
    }


    const handleSubmitPerson = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(formData);
            try {
                dispatch(createUser(formData));
                cleanerPerson();
                navigate('/');
                setRegistrationSuccess(true);
            } catch (error) {
                console.log(error);
            }
            setValidated(true);
        }
    };
    const handleSubmitSchool = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(formDataSchool);
            try {
                dispatch(createSchool(formDataSchool));
                cleanerSchool();
                setRegistrationSuccess(true);
            } catch (error) {
                console.log(error);
            }
            setValidated(true);
        }
    };

    const cleanerPerson = () => {
        setFormData({
            name: "",
            surname: "",
            email: "",
            password: "",
            avatar: null,
            birthday: "",
            type: ""
        });
    }
    const cleanerSchool = () => {
        setFormDataSchool({
            name: "",
            address: "",
            location: "",
            image: null,
            description: "",
            email: "",
            password: "",
            rate: "",
        });
    }
    if (registrationSuccess) {
        navigate("/");
    }
    return (
        <>
            <CustomNavbar />
            <Container className="registration-container">
                <div className='intro-registration'>
                    <p className='title-registration'>Registrati per ottenere accesso ai nostri servizi!</p>
                    <p>Registrandoti al nostro sito e fornendo tutte le informazioni richieste, inclusi i dettagli non obbligatori, ci permetti di offrirti un'esperienza migliore e altamente personalizzata. </p>
                    <div>
                        <label>
                            <input type="radio" name="registrationType" value="persona" onClick={handleFormPerson} />
                            Iscriviti come Persona
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="registrationType" value="scuola" onClick={handleFormSchool} />
                            Iscriviti come Scuola
                        </label>
                    </div>
                </div>
                {person && <Form
                    className="registration-form"
                    validated={validated}
                    onSubmit={handleSubmitPerson}
                    encType="multipart/form-data">
                    <Form.Group controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            type="text"
                            name="name"
                        />
                    </Form.Group>
                    <Form.Group controlId="surname">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    surname: e.target.value
                                })}
                            type="text"
                            name="surname" />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                            type="email"
                            name="email" />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })}
                            type="Password"
                            name="password" />
                    </Form.Group>
                    <Form.Group controlId="avatar">
                        <Form.Label>Foto Profilo</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    avatar: e.target.files[0]
                                })}
                            type="file"
                            name="avatar" />
                    </Form.Group>
                    <Form.Group controlId="birthday">
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    birthday: e.target.value
                                })}
                            type="text"
                            name="birthday" />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    type: e.target.value
                                })}
                            type="text"
                            name="type" />
                    </Form.Group>
                    <Button
                        variant="secondary"
                        type="submit">Registrati</Button>
                </Form>}
                {school && <Form
                    className="registration-form"
                    validated={validated}
                    onSubmit={handleSubmitSchool}
                    encType="multipart/form-data">
                    <Form.Group controlId="name">
                        <Form.Label>Nome scuola</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    name: e.target.value
                                })
                            }
                            type="text"
                            name="name"
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    address: e.target.value
                                })}
                            type="text"
                            name="address" />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Città</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    location: e.target.value
                                })}
                            type="text"
                            name="location" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    description: e.target.value
                                })}
                            type="text"
                            name="description" />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    image: e.target.files[0]
                                })}
                            type="file"
                            name="image" />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    email: e.target.value
                                })}
                            type="email"
                            name="email" />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setFormDataSchool({
                                    ...formDataSchool,
                                    password: e.target.value
                                })}
                            type="password"
                            name="password" />
                    </Form.Group>
                    <Button
                        variant="secondary"
                        type="submit">Registrati</Button>
                </Form>}
            </Container>
            <ModalLogin showModal={showModalLogin} setShowModal={setShowModalLogin} />
            <Footer />
        </>
    )
}
export default RegistrationPage
