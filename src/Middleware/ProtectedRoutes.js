import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import jwtDecode from 'jwt-decode'
=======
import jwtDecode from 'jwt-decode';
>>>>>>> CSS_IMPLEMENTATION
import { Outlet } from 'react-router-dom';
import ModalLogin from '../Components/NavBar/ModalLogin';

const auth = () => {
<<<<<<< HEAD
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    return JSON.parse(userLoggedIn);
}
export const logout = () => {
    localStorage.removeItem("userLoggedIn");
};

export const useSession = () => {

    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;
    const [showModal, setShowModal] = useState(!session);

    useEffect(() => {
        if (!session) {
            setShowModal(true);
        }
    }, [session]);

     return { decodedSession, showModal, setShowModal, session};
}

const ProtectedRoutes = () => {
    const isAuthorized = auth();
    const { decodedSession, showModal, setShowModal} = useSession();
    const session = useSession();


    return isAuthorized ? <Outlet /> : <ModalLogin showModal={showModal} setShowModal={setShowModal} />

}

export default ProtectedRoutes;
=======
  const userLoggedIn = localStorage.getItem("userLoggedIn");
  return JSON.parse(userLoggedIn);
};

export const logout = () => {
  localStorage.removeItem("userLoggedIn");
};

export const useSession = () => {
  const session = auth();
  const [decodedSession, setDecodedSession] = useState(session ? jwtDecode(session) : null);
  const [showModal, setShowModal] = useState(!session);
  const [isAuthenticated, setIsAuthenticated] = useState(!!session);

  useEffect(() => {
    if (!session) {
      setShowModal(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      setDecodedSession(jwtDecode(session));
    }
  }, [session]);

  return { decodedSession, showModal, setShowModal, isAuthenticated };
};

const ProtectedRoutes = () => {
  const { isAuthenticated, showModal, setShowModal } = useSession();

  return isAuthenticated ? <Outlet /> : <ModalLogin showModal={showModal} setShowModal={setShowModal} />;
};

export default ProtectedRoutes;
>>>>>>> CSS_IMPLEMENTATION
