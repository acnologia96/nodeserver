const express=require('express')
const path=require('path')
const cookieParser =require('cookie-parser')
const app = express()
const router=require('./routes/myRouter')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(router)
app.use(express.static(path.join(__dirname,'public')))


app.listen(3000,()=>{
    console.log("start server in port 3000")
})