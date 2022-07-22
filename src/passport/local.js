import passport from 'passport'
import { Strategy } from 'passport-local'

const localStrategy = Strategy
passport.use('session', new localStrategy({
    usernameField:'nombre',
    passwordField: 'password',
    passReqToCallback:true

}, async(req, nombre, password,donde)=>{
    const usuarioBD = await Usuarios.findOne({nombre})
    if(usuarioBD){
        return donde (null, false)
    }
    const usuarioNuevo = new Usuarios()
    usuarioNuevo.nombre = nombre
    usuarioNuevo.contrasena = password
    await usuarioNuevo.save()
    donde(null, usuarioNuevo)
}
))

passport.use('loggedIn', new localStrategy({
    usernameField: 'nombre',
    passwordField : 'password',
    passReqToCallback:true

},async(req,nombre,password,done)=>{
    const usuarioBD = await UsuariosfinOne({nombre})
    if(!usuarioBD){
        return done(null,false)
    }
    done(null,usuarioNuevo)
}

))

passport.serializeUser((usuario, done)=>{
    done(null,usuario.id)
})

passport.deserializeUser(async(id,done)=>{
    const usuario = await Usuarios.findById(id)
    done(null,usuario)
})