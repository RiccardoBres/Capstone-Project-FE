import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { loginUser, LoginUser } from '../../States/LoginState';
import { Link } from 'react-router-dom';



const ModalLogin = ({ showModal, setShowModal }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loginFormData, setLoginFormData] = useState({});


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
                            placeholder="email"
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
                </Form>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Link to='/'>
                    <Button  className='mt-0' variant="secondary" onClick={handleClose}>
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
