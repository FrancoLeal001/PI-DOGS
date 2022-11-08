import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/dogs", {
        })
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}
export function getTodo() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/dogs", {
        })
        const t= await axios.get("http://localhost:3001/temperament")
        const ahora=t.data.concat(json.data);
        console.log(ahora)
        return dispatch({
            type: 'GET_TODO',
            payload: json.data.concat(t.data)
        })
    }
}


export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/temperament`);
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data,
        });
    }
};









export function postDog(payload){
    return async function (dispatch){
        const response =await axios.post("http://localhost:3001/dogs", payload);
        console.log(payload)
        console.log(response)
        return response
    }
}











export function getDogByName(name) {
    return async function (dispatch) {
        if(name===""){
            alert("no se ingreso un nombre")
        }
        try {
            var json = await axios("http://localhost:3001/dogs?name=" + name)
            return dispatch({
                type: "GET_DOG_BY_NAME",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert("no se encontró perros con ese nombre, lo siento")
        }
    }
}




export function orderByName(payload) {
    return {
        type: "ORDE_BY_NAME",
        payload
    }
}
export function orderByWeight(payload) {
    return {
        type: "ORDE_BY_WEIGHT",
        payload
    }
}


export function temperamentFilter(payload) {
    return {
        type: "TEMPERAMENT_FILTER",
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3001/dogs/" + id);
            console.log(res.data[0].name)
            
            dispatch({
                type: "GET_DETAILS",
                payload: res.data[0]
            });
        } catch (error) {
console.log("muajajaj")
alert("no hay nada que ver aquí, puedes volver o ver una pagina vacía")
        }
    }
};

export const clearDetail = () => {
    console.log("estoy borrando todo")
    return {
        type: "GET_DETAILS",
        payload: undefined
    }

}

export  function dogOrigin(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}



