import { Router } from "express";
import passport from "passport";

const router = Router()

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    } else {
        res.render('loggedIn')
    }
}



const getNombreSession = (req) =>
req.session.nombre ? req.session.nombre : 'invitado'

router.get('/',(req,res)=>{
    res.render('session')
});

router.post('/session',(req,res)=>{
    
    for (const key in req.body) {
        req.session[key] = req.body[key]
    }
    
    res.render('loggedIn', { nombre: req.session.nombre });
    });



router.get('/cerrarSession',(req,res)=>{
    const nombre = getNombreSession(req)
    req.session.destroy((err)=>{
        if(err) {
            res.json({error : 'olvidar', body:err})
        } else {
            res.send(`Hasta luego ${nombre}`)
        }
    })
});


router.get('/info',(req,res)=>{
    const dato1 = process.argv
    const dato2 = process.platform
    const dato3 = process.memoryUsage
    const dato4 = process.execPath
    const dato5 = process.idd
    const dato6 = process.INIT_CWD

    res.send({dato1, dato2, dato3, dato4, dato5, dato6})
})

export default router