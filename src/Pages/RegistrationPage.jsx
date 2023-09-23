import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import CustomNavbar from '../Components/NavBar/CustomNavbar'
import Footer from '../Components/Footer/Footer';
import { createUser} from '../States/UserState';
import ModalLogin from '../Components/NavBar/ModalLogin';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'


const RegistrationPage = () => {

    const navigate = useNavigate();
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState('');


    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(formData);
            try {
                await dispatch(createUser(formData));
                cleaner();
                navigate('/');
            } catch (error) {
                console.log(error);
            }
            setValidated(true);   
        }
    };
   
    const cleaner =()=> {
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
    
    


    return (
        <>
            <CustomNavbar />
            <Container className="registration-container">
                <p className='title-registration'>Registrati per ottenere accesso ai nostri servizi!</p>
                <Form
                    className="registration-form"
                    validated={validated}
                    onSubmit={handleSubmit}
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
                </Form>
            </Container>
            <ModalLogin showModal={showModalLogin} setShowModal={setShowModalLogin} />
            <Footer />
        </>
    )
}
export default RegistrationPage
