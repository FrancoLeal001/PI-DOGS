import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";


function validate(input) {
    let errors = {};

    if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
        errors.name = 'Ingresa la Primera letra Mayuscula, Unicamente Letras y Numeros ';
    }

    if (!input.altura_minima || !/^[1-9]\d*(\.\d+)?$/.test(input.altura_minima)) {
        errors.altura_minima = 'El valor Min tiene que ser numerico no se permite coma';
    }
    if (!input.altura_maxima || !/^[1-9]\d*(\.\d+)?$/.test(input.altura_maxima)) {
        errors.altura_maxima = 'El valor Max tiene que ser numerico no se permite coma';
    }
    if (input.altura_maxima <= input.altura_minima) {
        errors.altura_minima = 'Min no puede ser Mayor o Igual que Max';
    }

    if (!input.peso_minimo || !/^[1-9]\d*(\.\d+)?$/.test(input.peso_minimo)) {
        errors.peso_minimo = 'El valor Min tiene que ser numerico no se permite coma';
    }
    if (!input.peso_maximo || !/^[1-9]\d*(\.\d+)?$/.test(input.peso_maximo)) {
        errors.peso_maximo = 'El valor Max tiene que ser numerico no se permite coma';
    }
    if (input.peso_maximo <= input.peso_minimo) {
        errors.peso_minimo = 'Min no puede ser Mayor o Igual que Max';
    }
   
    if (!input.Años_de_Vida || !/^[1-9]\d*(\.\d+)?$/.test(input.Años_de_Vida)) {
        errors.Años_de_Vida = 'El valor tiene que ser numerico no se permite coma';
    }


    if (input.temperamento.length <= 2) {
        errors.temperamento = 'Se requieren al menos tres(3) Temperamentos';
    }
    return errors
}




export default function DogCreate() {

    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTemperaments());

    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        image: "",
        altura_maxima: "",
        altura_minima: "",
        peso_maximo: "",
        peso_minimo: "",
        Años_de_Vida: "",
        temperamento: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        console.log(input.peso_maximo)
        console.log(input.peso_minimo)
    }

    function handleSelect(e) {
        if (e.target.name == "temperamento") {
            if (!input.temperamento.some(p => e.target.value == p))
                setInput({
                    ...input,
                    temperamento: [...input.temperamento, e.target.value]
                })
        }
    }
    function handleDelete(el){
        setInput({
            ...input,
            temperamento: input.temperamento.filter(e=> e !== el)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(Object.keys(errors))
        if (Object.keys(errors).length === 0 && input.name !== "" && input.altura_minima !== "" && input.altura_maxima !== "" && input.peso_minimo !== ""
            && input.peso_maximo !== "" && input.Años_de_Vida !== "" && input.temperamento.length !== 0 && input.peso_maximo>input.peso_minimo&&input.altura_maxima>input.altura_minima) {
            dispatch(postDog(input))
            
            alert("Tu Perrito ha sido Creado con Exito!!!")
            setInput({
                name: "",
                altura_minima: "",
                altura_maxima: "",
                peso_minimo: "",
                peso_maximo: "",
                Años_de_Vida: "",
                temperamento: [],
                imagen: "",
            })
            history.push('/home')
        }
        else {
            alert("Debe completar Todos los campos sin Errores primero, los campos con * son Obligarotios!")

        }
    }



    useEffect(() => {
        dispatch(getTemperaments());
    }, []);





    return (
        <div >
            <Link to='/home' ><button>Atrás</button></Link>
            <h1>Crea tu propio perro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre * </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {errors.name && (<p  >{errors.name}</p>)}

                </div>
                <div> 
    <label>temperamentos *         </label>
    {errors.temperamento && (<p >{errors.temperamento}</p>)}
                <select name='temperamento' onChange={(e) => handleSelect(e)}>


                    {temperaments.map((p, item) => (
                        <option value={p.name} key={item} >{p.name} </option>
                    ))}

                </select>
                <ul><li >{input.temperamento.map(el=> <button  type='button' key={el.id} onClick={()=>handleDelete(el)}>{el}</button>)}</li></ul>
                <div></div>
</div>
                <div>
                    <label>Imagen</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Altura minima *</label>
                    <input
                        type="text"
                        value={input.altura_minima}
                        name="altura_minima"
                        onChange={handleChange}
                    /><label>cm</label>
                    {errors.altura_minima && (<p  >{errors.altura_minima}</p>)}
                </div>
                <div>
                    <label>Altura máxima *</label>
                    <input
                        type="text"
                        value={input.altura_maxima}
                        name="altura_maxima"
                        onChange={handleChange}
                    /><label>cm</label>
                    {errors.altura_maxima && (<p  >{errors.altura_maxima}</p>)}
                </div>
                <div>
                    <label>Peso minimo *</label>
                    <input
                        type="text"
                        value={input.peso_minimo}
                        name="peso_minimo"
                        onChange={handleChange}
                    /><label>kg</label>
                    {errors.peso_minimo && (<p  >{errors.peso_minimo}</p>)}
                </div>
                <div>
                    <label>peso máximo *</label>
                    <input
                        type="text"
                        value={input.peso_maximo}
                        name="peso_maximo"
                        onChange={handleChange}
                    /><label>Kg</label>
                    {errors.peso_maximo && (<p  >{errors.peso_maximo}</p>)}
                </div>

                <div>
                    <label>Años de vida *</label>
                    <input
                        type="text"
                        value={input.Años_de_Vida}
                        name="Años_de_Vida"
                        onChange={handleChange}
                    /><label> años</label>
                    {errors.Años_de_Vida && (<p  >{errors.Años_de_Vida}</p>)}
                </div>



                <button type="submit">Crear perro</button>
            </form>

            <h4>imagen del perro</h4>
            <img src={input.image} widht={250} height={250} alt="sin imagen"></img>





        </div>
    )


}
