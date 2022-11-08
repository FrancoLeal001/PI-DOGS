const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const router = Router();
const { Temperament, Dog } = require('../db')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





const getApiInfo = async () => {
  const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
  const apiInfo = await apiUrl.data.map(hola => {
    return {
      name: hola.name,
      img: hola.image.url,
      altura: hola.height.imperial,
      peso: hola.weight.imperial,
      id: hola.id,
      añosDeVida: hola.life_span,
      temperamento: hola.temperament,
      raza: hola.breed_group,
    
      VDE: "si"
    };
  });
  return apiInfo;
}

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
}



const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const DbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(DbInfo);
  console.log(DbInfo)
  return infoTotal
}
router.get('/dogs', async (req, res) => {
  const name = req.query.name
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter(hola => hola.name.toLowerCase().includes(name.toLowerCase()))
    dogName.length ?
      res.status(200).send(dogName) :
      res.status(404).send('no está el perro')
  } else res.status(200).send(dogsTotal)
})



router.get("/temperament", async (req, res) => {
  
  try {
    const allTemperaments = await Temperament.findAll();

    if (allTemperaments.length === 0) {

      const temperamentsApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds`
      );

      const temperaments = temperamentsApi.data.map((e) => {
        const todos = e.temperament;

        return todos;
      });

      const sinEspacios = temperaments.map((e) => e && e.split(", ")).flat(); // intera en los array y devuelve un solo array con todos los elementos
      const sinRepetidos = [...new Set(sinEspacios)];
      console.log("4");
      var aux = sinRepetidos
        .map((e) => {
          return {
            name: e,
          };
        })
        .filter((e) => e.name);
      const todos = await Temperament.bulkCreate(aux); //recibe un arreglo con objetos y asigna a mi tabla segun la propiedad el valor
      return res.send(todos);
    } else {
      console.log("estoy en else");
     
      return res.send(allTemperaments);
      
    }
  } catch (error) {
    console.log("Se encontro un Error en get /temperaments", error)
  }
});






router.post('/dogs', async (req, res) => {
  let {
    name,
    image,
    altura_maxima,
    altura_minima,
    peso_maximo,
    peso_minimo,
    Años_de_Vida,
    createdInDb,
    temperamento
    
  } = req.body
  
  let dogCreated = await Dog.create({
    name,
    image,
    altura_maxima,
    altura_minima,
    peso_maximo,
    peso_minimo,
    Años_de_Vida,
    createdInDb,
  })
  if(!name||!altura_maxima||!altura_minima||!peso_maximo||!peso_minimo||!Años_de_Vida){
    return res.status(500).send("faltan añgunos campos")
  }

  
  let temperamentDb = await Temperament.findAll({
    where: { name: temperamento },

  });

  await dogCreated.addTemperament(temperamentDb);
  res.send('perro creado con exito');
})






router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allDog = await getAllDogs();
    if (id) {
      let dogId = await allDog.filter((el) => el.id.toString() === id.toString());
      dogId.length
        ? res.status(200).json(dogId)
        : res.status(404).send("Lo siento, no se encontro el Perrito");
    }
  } catch (error) {
    console.log("Se presento un error en la ruta get /dogs/:id", error)
  }
});

router.delete('/dogs/delete/:id', async (req, res)=>{
  const {id}=req.params;
  try{
    const elem=await Dog.destroy({
      where:{id:id}
    });
    
  }catch(error){
    res.send(`error en la ruta... ${error}`)
  }res.send("dog has been deleted")
})



module.exports = router;






//     {"name":"hola",
//     "image":"N/A",
//      "altura_maxima":"14",
//     "altura_minima":"10",
//     "peso_maximo":"50",
//     "peso_minimo":"10",
//     "Años_de_Vida":"10",
//     
//     "temperamento":"funny"
//     }