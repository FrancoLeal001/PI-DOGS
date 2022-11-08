import React from 'react';
import './card.css'

export default function Card({ name, image, peso, temperamento }) {
    return (
        <div className='container'>
            <div className='hola'>
                <img className='imag' src={image} alt='img not found' width="200px" heigth="250px" />
                <h3>nombre: {name}</h3>
                <h5>peso: {peso}</h5>
                <h5>temperamentos: {temperamento}</h5>

            </div>


        </div>


    );
}