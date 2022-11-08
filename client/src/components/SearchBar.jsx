import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../actions";


export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")


    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleBusqueda(e) {
        e.preventDefault()
        dispatch(getDogByName(name))
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleBusqueda(e)}>buscar</button>
        </div>
    )
}


