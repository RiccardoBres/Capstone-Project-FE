import { useState } from 'react'
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { loginUser, LoginUser } from '../../States/LoginState';
import { Link } from 'react-router-dom';



const ModalLogin = ({ showModal, setShowModal }) => {


=======
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { loginUser, LoginUser, loginError } from '../../States/LoginState';
import { Link } from 'react-router-dom';
import { useSession } from '../../Middleware/ProtectedRoutes';



const ModalLogin = ({ showModal, setShowModal, setUserData }) => {

    const session = useSession();
>>>>>>> CSS_IMPLEMENTATION
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loginFormData, setLoginFormData] = useState({});
<<<<<<< HEAD


    const handleClose = () => {
        setShowModal(false)
    }

    const handleLogin = () => {
        dispatch(loginUser(loginFormData))
        if (LoginUser) {
            handleClose();
            navigate('/');
        }
    };
=======
    const [errorLogin, setErrorLogin] = useState(false);



    const handleClose = () => {
        setShowModal(false);
        setErrorLogin(null)
    }

    const handleLogin = async () => {
        try {
            const response = await dispatch(loginUser(loginFormData));
            if (response.payload === 'Invalid password') {
                setErrorLogin('Invalid password');
            } else {
                setUserData(session.decodedSession);
                setShowModal(false);
                console.log('Login success:', response);
            }
        } catch (error) {
            // Gestisci altri tipi di errori qui
            console.error('Login error:', error);
        }
    };


>>>>>>> CSS_IMPLEMENTATION
    return (
        <Modal show={showModal} centered onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
<<<<<<< HEAD
                            placeholder="email"
=======
                            placeholder="Email"
>>>>>>> CSS_IMPLEMENTATION
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                            })}
                        />
                    </Form.Group>
<<<<<<< HEAD

=======
>>>>>>> CSS_IMPLEMENTATION
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                password: e.target.value,
                            })}
                        />
                    </Form.Group>
<<<<<<< HEAD
=======
                    {errorLogin && <p className="text-danger">Email o password non valida</p>}
>>>>>>> CSS_IMPLEMENTATION
                </Form>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Link to='/'>
<<<<<<< HEAD
                    <Button  className='mt-0' variant="secondary" onClick={handleClose}>
=======
                    <Button className='mt-0' variant="secondary" onClick={handleClose}>
>>>>>>> CSS_IMPLEMENTATION
                        Close
                    </Button>
                </Link>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
<<<<<<< HEAD
=======

>>>>>>> CSS_IMPLEMENTATION
    )
}

export default ModalLogin
