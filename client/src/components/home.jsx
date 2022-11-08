import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments, orderByName, orderByWeight,temperamentFilter, dogOrigin, getDogByName, getTodo } from '../actions';
import { Link } from 'react-router-dom'
import Card from './card';
import Paginado from './Paginado';
import './home.css'





export default function Home() {
    const dispatch = useDispatch()
    const [orden, setOrden] = useState('')
    const [name, setName] = useState("")
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    const todo=useSelector((state)=>state.todo)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogPerPage, setDogPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogPerPage
    const indexOfFirstDog = indexOfLastDog - dogPerPage
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {

        setCurrentPage(pageNumber)
    }
    const pageNumber = Math.ceil(allDogs.length / dogPerPage)

    const nextPage = () => {
        if (currentPage === pageNumber) alert("ya no hay más perros");
        else setCurrentPage(currentPage + 1);
    }

    const prePage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
        else alert("no se puede ir más atrás")
    }


    //let razas = allDogs.map(e => e.raza);
    //let raza = [...new Set(razas)]
    //let FDR = [];
    //for (let i = 0; i < raza.length; i++) {
    //    if (raza[i] === undefined || raza[i] === "") {
//
    //    }
    //    else {
    //        FDR.push(raza[i])
//
    //    }
    //}





    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
        dispatch(getTodo());    
       
    }, [dispatch])


    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleBusqueda(e) {
        e.preventDefault()
        dispatch(getDogByName(name))
        setCurrentPage(1);
    }


    function handlerClick(e) {
        e.preventDefault();
        dispatch(getDogs())
        console.log(todo)
       console.log(allTemperaments)
    }

   function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }


    function handleSort2(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function filterTemp(e){
        e.preventDefault();
        dispatch(temperamentFilter(e.target.value))
        setCurrentPage(1);
        
        
    } 
    function consola(e){
        console.log(e.target.value)
    }
    function handleOriginFilter(e) {
        console.log(allDogs)
        setTimeout(2000)
        dispatch(dogOrigin(e.target.value))
        
        setCurrentPage(1)
    }
  
    


    return (
        <div className='fondo'>
            <h5>pagina: {currentPage}</h5>
            <Link to='/CreateDog'>Crea perro</Link>
            <h1>Dogs is life</h1>

            <div>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleBusqueda(e)}>buscar</button>
        </div>
            <button onClick={e => { handlerClick(e) }}>Volver a cargar los perros</button>
            <div>



                <select onChange={(e) => handleSort(e)}>
                    <option value='asc'>A...Z</option>
                    <option value='des'>Z...A</option>
                </select>
                
                <select onChange={(e)=>consola(e)}>
                    <option value="todo">cualquier precio</option>
                    <option value="<200">-$200</option>
                    <option value=">200<500">+200 -500</option>
                    <option value=">500<1000">+500 -1000</option>
                    <option value=">1000<1500">+1000 -1500</option>
                    <option value=">1500">+1500</option>
                </select>

                <select onChange={(e)=>handleSort2(e)}>
                    <option value='asc'>ascendente peso</option>
                    <option value='des'>descendente peso</option>
                </select>



                <select onChange={(e)=>handleOriginFilter(e)}>

                    <option value='all'>todos los perros</option>
                    <option value='API'>perros existentes</option>
                    <option value='created'>perros creados</option>
                    

                </select>
                

                <select onChange={e=>filterTemp(e)}>

                    <option value='all'>todos los temperamentos</option>
                    {allTemperaments && allTemperaments.map((p, item) => (
                        <option value={p.name} key={item} name="p.name">{p.name} </option>
                    ))}

                </select>

                <button onClick={() => { prePage() }}> prev </button>
                <Paginado
                
                    dogPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
                <button onClick={() => { nextPage() }}> next </button>


                <div className='conteiner'>
                    {currentDog.map((c) => {
{if(c.Temperaments){
    c.peso=c.peso_minimo +" - "+c.peso_maximo
    c.img=c.image
    let temperamento=[]
    for(let i=0; i<c.Temperaments.length;i++){
        temperamento.push(c.Temperaments[i].name+", ")
    
    }
    temperamento.toString()
    c.temperamento=temperamento
    }
}
                        return (


                            <Link to={'/dogs/' + c.id} key={c.id}>
                                
                                <Card name={c.name} image={c.img} peso={c.peso + "Kg"} temperamento={c.temperamento} key={c.id} />
                            </Link>



                        )
                    })}
                </div>



            </div>
        </div>

    )


}
 //<option >todo</option>
 //                   {todo && todo.map((p, ) => (
 //                       <option  >{p.name} </option>
 //                   ))}