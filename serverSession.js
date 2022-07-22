import MongoStore from 'connect-mongo';
import express from 'express';
import session from "express-session"
import sessionRoutes from './src/routes/apiRoutes.js'
import yargs from 'yargs'
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology:true }


import './src/passport/local.js'
import passport from "passport";
import 'dotenv/config'
import config from './config.js'

const app = express()

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session(
    {
    store: MongoStore.create({ 
        mongoUrl : `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@proyectocoder.jilwab4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: adavancedOptions
    }),
    secret:'key',
    resave:true,
    saveUninitialized:true,

}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', sessionRoutes) 


app.listen(config.PORT,()=>{
    console.log(`Escuchando al puerto ${config.PORT}`)
})

