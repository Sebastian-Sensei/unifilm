import express from 'express'
import bodyParser from 'body-parser'
import { usuario } from './routes'
import { pelicula } from './routes'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//if(process.env.NODE_ENV === 'development' ) {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers' ,'Origin, X-Request-With, Content-Type, Accept')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
        next()
    })
//}

app.use('/api/usuarios', usuario)

app.use('/api/peliculas', pelicula)


export default app
