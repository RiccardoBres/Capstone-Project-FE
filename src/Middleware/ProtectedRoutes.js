import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import { Outlet } from 'react-router-dom';
import ModalLogin from '../Components/NavBar/ModalLogin';

const auth = () => {
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