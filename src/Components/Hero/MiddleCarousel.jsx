import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Surfimmage from "./AssetsHero/espinho.jpg";
import Surfimmage3 from "./AssetsHero/PraiasSurf_Ar.jpg";
import Surfimmage4 from "./AssetsHero/Banner.jpg";
import { Link } from 'react-router-dom';
import Map from "./AssetsHero/Map.jpg"
import FoundSpot from '../VolatileComponents/FoundSpot';
import './Hero.css'

const MiddleCarousel = () => {
    return (
        <>
            <div className='carousel-container'>
                <em className='title-carousel mb-3'>~ Fatti accompagnare in un esperienza magica ~</em>
                <em className='intro'>Benvenuti alla nostra pagina dedicata alle prenotazioni per mete surfistiche indimenticabili! <br /> Se siete alla ricerca dell'onda perfetta e di un'avventura unica sull'acqua, siete nel posto giusto. <br />La nostra piattaforma vi guiderà passo dopo passo nell'emozionante processo di prenotazione di esperienze di surf straordinarie. </em>
                <hr className='color-light' />
                <Carousel>
                    <Carousel.Item className='carousel-item carousel-slide'>
                        <img className='carousel-img' src={Surfimmage} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Oltre mille località!</h3>
                            <em>Trova le onde più adatte al tuo stile di Surf</em>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='carousel-item carousel-slide'>
                        <img className='carousel-img' src={Surfimmage3} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Scegli chi ti guiderà</h3>
                            <em>Trova l'istruttore che più fa al caso tuo</em>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='carousel-item carousel-slide'>
                        <img className='carousel-img' src={Surfimmage4} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Trova il gruppo ideale</h3>
                            <p> Organizza sessioni di gruppo con persone da tutta Europa</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <FoundSpot />
        </>
    )
}

export default MiddleCarousel
