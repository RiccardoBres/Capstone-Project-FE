import { useState, useEffect } from 'react'
import "./Registration.css";
import Logo from "../../Components/NavBar/Assets/Surf-Logo-2.jpg";
import { Link } from 'react-router-dom';

const AccessRegistration = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const targetHeightShow = 50; 
            const targetHeightHide = 790; 

            if (window.scrollY >= targetHeightShow && window.scrollY <= targetHeightHide) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const toggleContentVisibility = () => {
        setContentVisible(!contentVisible);
    };

    const closeComponent = () => {
        setContentVisible(false);
    };

    return (
        <>
            <div className={`component ${isVisible ? 'component-fixed' : ''}`}>
                {isVisible &&
                    <div className={`invite ${contentVisible ? '' : 'display-none'}`}>
                        <img
                            className='logo-immage-access'
                            src={Logo}
                            alt="Logo"
                            onClick={toggleContentVisibility}
                        />
                        {contentVisible && (
                            <div className='my-3'>
                                <em>Registrati per ottenere accesso a contenuti esclusivi!</em>
                                <div className='go-to-page-container'>
                                    <Link to={"/signUp"}>
                                        <p>
                                            Registrati
                                        </p>
                                    </Link>
                                    <p onClick={closeComponent}>
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

export default AccessRegistration
