import React, { useEffect, useState } from 'react';
import "./Registration.css";
import Logo from "../../Components/NavBar/Assets/Surf-Logo-2.jpg";
import { Link } from 'react-router-dom';
import { useSession } from '../../Middleware/ProtectedRoutes';

const AccessRegistration = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const { isAuthenticated } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const targetHeightShow = 250;
            if (window.scrollY >= targetHeightShow) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isAuthenticated]);

    const toggleContentVisibility = () => {
        setContentVisible(!contentVisible);
    };

    const closeComponent = () => {
        setContentVisible(false);
    };

    return (
        <>
            <div className={`component ${isVisible && isAuthenticated ? 'component-fixed' : ''}`}>
                {isVisible && isAuthenticated &&
                    <div className={`invite ${contentVisible ? '' : 'display-none'}`}>
                        <img
                            className='logo-immage-access'
                            src={Logo}
                            alt="Logo"
                            onClick={toggleContentVisibility}
                        />
                        {contentVisible && (
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

export default AccessRegistration;
