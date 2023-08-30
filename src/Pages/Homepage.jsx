import React from 'react'
import CustomNavbar from '../Components/NavBar/CustomNavbar'
import Hero from '../Components/Hero/Hero'
import AccessRegistration from '../Components/VolatileComponents/AccessRegistration'
import FoundSpot from '../Components/VolatileComponents/FoundSpot'
import Footer from '../Components/Footer/Footer'
import MiddleCarousel from '../Components/Hero/MiddleCarousel'
import Schools from '../Components/Hero/Schools'
import HeroBeach from '../Components/Beach/HeroBeach'

const Homepage = () => {
    return (
        <>
            <AccessRegistration/>
            <FoundSpot/>   
            <Hero />
            <HeroBeach/>
            <MiddleCarousel/> 
            <Schools/>
            <Footer/>
        </>
    )
}

export default Homepage
