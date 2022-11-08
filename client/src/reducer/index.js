const initialState = {
    dogs: [],
    temperaments: [],
    detail: {},
    alldogs: [],
    todo:[]

}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                alldogs: action.payload
            }
            case "GET_TODO":
                return{
                    ...state,
                    todo: action.payload
                }

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "GET_DOGS_FOR_BREED":
            return {
                ...state,
                dogs: action.payload
            }

        case "GET_DOG_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }
        case "ORDE_BY_NAME":
            let sortedArr = action.payload === 'asc' ?
                state.alldogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.alldogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedArr
            }
        case "POST_DOG":
            return {
                ...state,
            }
        case "ORDE_BY_WEIGHT":
            let peso = action.payload === 'asc' ?
                state.alldogs.sort(function (a, b) {
                    if (parseInt(a.peso) > parseInt(b.peso)) {
                        return 1;
                    }
                    if (parseInt(a.peso) < parseInt(b.peso)) {
                        return -1;
                    }
                    return 0;
                }) :
                state.alldogs.sort(function (a, b) {
                    if (parseInt(a.peso) > parseInt(b.peso)) {
                        return -1;
                    }
                    if (parseInt(a.peso) < parseInt(b.peso)) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: peso
            }
        case 'FILTER_CREATED':
            const dogs = state.alldogs
            
            const originfilter = action.payload === 'created' ? dogs.filter(p => p.createdInDb) : dogs.filter(p => !p.createdInDb)
if(originfilter.length===0){
   alert("no hay ningun perro aun")
   action.payload="all"
   
}
            console.log(originfilter)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.alldogs : originfilter
            }

        

        case "TEMPERAMENT_FILTER":

            const allDogs = state.alldogs;

            console.log(allDogs)
            const temperamentFiltered =
                action.payload === "all"
                    ? allDogs
                    : allDogs.filter(
                        (el) =>
                            el.temperamento &&
                            el.temperamento.split(", ").find((e) => e === action.payload)
                    );


            return {
                ...state,
                dogs: temperamentFiltered,
            };



        case "GET_DETAILS":
            console.log("soy el payload", action.payload)
            return {
                ...state,
                detail: action.payload
            }






        default:
            return state;
    }





}



export default rootReducer;



//let nuevotemp=[];
//       for(let i=0;i<allDogs.length; i++){
//                    if (allDogs[i].createdInDb===true){
//                        for(let j=0;j<allDogs[i].Temperaments.length;j++){
//                            nuevotemp.push(allDogs[i].Temperaments[j].name)
//                          console.log(allDogs[i].Temperaments[j])
//                        }
//
//                        nuevotemp.toString()
//            allDogs[i].Temperaments = nuevotemp
//                        console.log(allDogs[i].Temperaments)
//                    }
//
//                }




//case "ORDE_BY_NAME":
//            let sortedArr = action.payload === 'asc' ?
//                state.{elementos}.sort(function (a, b) {
//                    if (a.name > b.name) {
//                        return 1;
//                    }
//                    if (a.name < b.name) {
//                        return -1;
//                    }
//                    return 0;
//                }) :
//                state.{elementos}.sort(function (a, b) {
//                    if (a.name > b.name) {
//                        return -1;
//                    }
//                    if (a.name < b.name) {
//                        return 1;
//                    }
//                    return 0;
//                })
//            return {
//                ...state,
//                cambiar: sortedArr
//            }



//case 'FILTER_PRICE':
//            const insumos = state.alldogs
//              const precios;
//            if(action.payload==="<200"){
//              precios=insumos.filter(p=>p.price<=200)
//             if(action.payload==="">200<500""){
//              precios=insumos.filter(p=>p.price>200 && p.price<500)
//}
//}
//             
//  return {
//      ...state,
//      dogs: action.payload === 'all' ? state.alldogs : originfilter
//  }