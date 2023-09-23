import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { loginUser, LoginUser, loginError } from '../../States/LoginState';
import { Link } from 'react-router-dom';
import { useSession } from '../../Middleware/ProtectedRoutes';



const ModalLogin = ({ showModal, setShowModal, setUserData }) => {

    const session = useSession();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loginFormData, setLoginFormData] = useState({});
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
                            placeholder="Email"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                            })}
                        />
                    </Form.Group>
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
                    {errorLogin && <p className="text-danger">Email o password non valida</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Link to='/'>
                    <Button className='mt-0' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Link>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogin
