import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDetail, clearDetail } from "../actions";
import React from "react";


export default function Detail() {

    const dispatch = useDispatch()
    const { id } = useParams();
    const myDog = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, id])

    if(!myDog){
        console.log("no hay nada")
    }


    if (myDog) {
        setTimeout(2000)
        if (myDog.hasOwnProperty('Temperaments')) {
            let temperamento = []
            for (let i = 0; i < myDog.Temperaments.length; i++) {
                temperamento.push(myDog.Temperaments[i].name + ", ")

            }
            temperamento.toString()
            myDog.temperamento = temperamento
        }
    }










    if (myDog === undefined) {
        return (
            <div className='loading'>
                <h1>LOADING ...</h1>
                <img src='https://acegif.com/wp-content/uploads/gif/dog-chasing-tail-19.gif' alt='img' />
            </div>
        )
    } else {
        return (
            <div>
                {
                    <div>
                        <h2>permiteme contarte sobre mí:</h2>
                        <h1>soy {myDog.name}</h1>
                        <p>este soy yo ↓</p>
                        <img src={myDog.img ? myDog.img : myDog.image} alt='img not found' width="606px" heigth="380px" />
                        <h4>generalmente soy {myDog.temperamento}</h4>
                        <h4>Suelo pesar entre {myDog.peso ? myDog.peso : myDog.peso_minimo + "-" + myDog.peso_maximo}Kg</h4>
                        <h4>Mido {myDog.altura ? myDog.altura : myDog.altura_minima + "-" + myDog.altura_maxima}cm</h4>
                        <h4>y puedo llegar a vivir {myDog.añosDeVida ? myDog.añosDeVida : myDog.Años_de_Vida + " años"}</h4>


                    </div>
                }
                <Link to='/home'>
                    <button>Atrás</button>
                </Link>

            </div>
        )


    }


}    