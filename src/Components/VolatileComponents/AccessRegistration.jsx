<<<<<<< HEAD
import { useState, useEffect } from 'react'
import "./Registration.css";
import Logo from "../../Components/NavBar/Assets/Surf-Logo-2.jpg";
import { Link } from 'react-router-dom';
=======
import React, { useEffect, useState } from 'react';
import "./Registration.css";
import Logo from "../../Components/NavBar/Assets/Surf-Logo-2.jpg";
import { Link } from 'react-router-dom';
import { useSession } from '../../Middleware/ProtectedRoutes';
>>>>>>> CSS_IMPLEMENTATION

const AccessRegistration = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
<<<<<<< HEAD

    useEffect(() => {
        const handleScroll = () => {
            const targetHeightShow = 50; 
            const targetHeightHide = 790; 

            if (window.scrollY >= targetHeightShow && window.scrollY <= targetHeightHide) {
=======
    const { isAuthenticated } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const targetHeightShow = 250;
            if (window.scrollY >= targetHeightShow) {
>>>>>>> CSS_IMPLEMENTATION
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
<<<<<<< HEAD
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
=======

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isAuthenticated]);
>>>>>>> CSS_IMPLEMENTATION

    const toggleContentVisibility = () => {
        setContentVisible(!contentVisible);
    };

    const closeComponent = () => {
        setContentVisible(false);
    };

    return (
        <>
<<<<<<< HEAD
            <div className={`component ${isVisible ? 'component-fixed' : ''}`}>
                {isVisible &&
=======
            <div className={`component ${isVisible && isAuthenticated ? 'component-fixed' : ''}`}>
                {isVisible && isAuthenticated &&
>>>>>>> CSS_IMPLEMENTATION
                    <div className={`invite ${contentVisible ? '' : 'display-none'}`}>
                        <img
                            className='logo-immage-access'
                            src={Logo}
                            alt="Logo"
                            onClick={toggleContentVisibility}
                        />
                        {contentVisible && (
<<<<<<< HEAD
                            <div className='my-3'>
                                <em>Registrati per ottenere accesso a contenuti esclusivi!</em>
                                <div className='go-to-page-container'>
                                    <Link to={"/signUp"}>
                                        <p>
                                            Registrati
                                        </p>
                                    </Link>
                                    <p onClick={closeComponent}>
=======
                            <div className='container-intro-component-volatil'>
                                <p className='intro-component'>Programma la tua prossima meta</p>
                                <div className='go-to-page-container'>
                                    <Link className='intro-component' to={"/posts"}>
                                        <p>
                                            Vai
                                        </p>
                                    </Link>
                                    <p
                                        className='intro-component'
                                        onClick={closeComponent}>
>>>>>>> CSS_IMPLEMENTATION
                                        Chiudi
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

<<<<<<< HEAD
export default AccessRegistration
=======
export default AccessRegistration;
>>>>>>> CSS_IMPLEMENTATION
