import React, { useState } from 'react';
import CustomNavbar from '../../Components/NavBar/CustomNavbar';
import './BeachOptions.css'; // Importa il file CSS per lo stile

const BeachOptions = () => {
    const [destination, setDestination] = useState('');
    const [level, setLevel] = useState('');
    const [preferences, setPreferences] = useState('');


    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };
    const handlePreferencesChange = (event) => {
        setPreferences(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // Puoi inserire qui la logica per gestire il submit del form
        // Ad esempio, inviare i dati al server o eseguire altre azioni.
    };

    const beachOptions = ['Francia', 'Italia', 'Portogallo', 'Spagna'];
    const levelOptions = ['Principiante', 'Intermedio', 'Avanzato']
    const preferencesOptions = ['Bodyboard', 'Surf', 'Sup']

    return (
        <>
            <CustomNavbar />
            <div className="beach-options-container">
                <form className="beach-options-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        Dove vuoi andare?
                        <select className="form-select" value={destination} onChange={handleDestinationChange}>
                            <option value="">Seleziona una destinazione</option>
                            {beachOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select className="form-select" value={level} onChange={handleLevelChange}>
                            <option value="">Indica la tua esperienza</option>
                            {levelOptions.map((level, index) => (
                                <option key={index} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                        <select className="form-select" value={preferences} onChange={handlePreferencesChange}>
                            <option value="">Seleziona la tua preferenza</option>
                            {preferencesOptions.map((preferences, index) => (
                                <option key={index} value={preferences}>
                                    {preferences}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className="form-button" type="submit">Cerca</button>
                </form>
            </div>
        </>
    );
};

export default BeachOptions;
