const { Router } = require('express')
//Aca lo que estamos haciendo es separar en archivos, entonces para separar en archivo estamos llamando a un metodo clase (ROUTER) para poder configurar las rutas de una manera especifica 

const router = Router() //Aca hago lo mismo que se hacia cuando creaba app = express()

//Esto es un middleware en el endpoint 
function auth(req, res, next) {
    req.user = {
        name: 'fede',
        role: 'admin'
    }
    if (req.user.role !== 'admin') {
        return res.send('no puede avanzar a partir de aqui')
    }
    next()
}

const users = []

router.get('/', auth, ( peticion, respuesta ) => { //y aca lo que hace AUTH ES PROTEGER ESA RUTA y aca el middleware esta en la ruta 

    respuesta.send({data: users})
})

// request obj
// http://localhost:8080/ + /api/users + /

router.post('/', ( peticion, respuesta ) => {
    const { body } = peticion
    if(!body.email || !body.password ){
       return  respuesta.status(400).send({status: 'error', error: 'falta data'})
    }
    users.push( { id: users.length + 1, ...body })
    respuesta.status(200).send({data: users})
})

router.put('/', ( peticion, respuesta ) => {
    
    respuesta.send('put hola mundo')
})

router.delete('/:uid', ( peticion, respuesta ) => {
    const { uid } = peticion.params
    const nuevaLista = users.filter(user => user.id !== Number(uid))
    respuesta.send(nuevaLista)
})
// ['1', '2', '3'] ->  ['1', '2']

// router.get('/api/productos',)


// export default router / type module
module.exports = router // common js esto es una exportación por defecto

// const carts = [
//     {id: 'asdfasdfasd', products: [{},{}]},
//     {id: 'asdfasdfasd', products: []},
//     {id: 'asdfasdfasd', products: []},
//     {id: 'asdfasdfasd', products: []},
//     {id: 'asdfasdfasd', products: []},
//     {id: 'asdfasdfasd', products: []},
// ]