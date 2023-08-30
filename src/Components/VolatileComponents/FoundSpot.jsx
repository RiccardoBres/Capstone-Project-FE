import { useState, useEffect } from 'react'
import "./Registration.css";
import { Link } from 'react-router-dom';
import Map from "../Hero/AssetsHero/Map.jpg"
import { useSession } from '../../Middleware/ProtectedRoutes';
import { LoginUser } from '../../States/LoginState';



const FoundSpot = () => {
    const session = useSession();
    const [isVisible, setIsVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            console.log(session);
            const targetHeightShow = 800;
            const targetHeightHide = 1900;

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
        <div className={`component ${isVisible ? 'component-fixed-2' : ''}`}>
            {isVisible &&
                <div className={`invite ${contentVisible ? '' : 'display-none'}`}>
                    <img
                        className='logo-immage-access'
                        src={Map}
                        alt="Logo"
                        onClick={toggleContentVisibility}
                    />
                    {contentVisible && (
                        <div className='my-3'>
                            {session.session ? (
                                <div className='custom-div-for-both'>
                                    <Link to='/beachOptions'>
                                        Inizia la tua ricerca
                                    </Link>
                                </div>
                            ) : (
                                <div className='custom-div-for-contentVisible'>
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
                    )}
                </div>
            }
        </div>
    )
}

export default FoundSpot
