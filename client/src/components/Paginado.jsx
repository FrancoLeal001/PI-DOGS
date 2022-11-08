import React from "react";
import './Paginado.css'


export default function Paginado({ dogPerPage, allDogs, paginado }) {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allDogs / dogPerPage); i++) {
        
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="paginado">
                {pageNumber &&
                    pageNumber.map(number => (
                        <li className="number" key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
} 