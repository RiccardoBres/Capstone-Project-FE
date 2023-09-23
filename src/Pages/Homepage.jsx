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
            <CustomNavbar/>
            <Hero />
            <HeroBeach/>
            <AccessRegistration/>
            <MiddleCarousel/> 
            <Schools/>
            <Footer/>
        </>
    )
}

export default Homepage
