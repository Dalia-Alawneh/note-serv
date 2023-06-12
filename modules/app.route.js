import userRouter from './user/user.route.js'
import authRouter from './auth/auth.route.js'
import noteRouter from './note/note.router.js'
const initApp = (app, express)=>{
    app.use(express.json())
    app.use('/user',userRouter)
    app.use(authRouter)
    app.use('/note', noteRouter)
    app.use('*', (req,res)=>{
        res.json({message:"page not found"})
    })
}

export default initApp