//จัดการ Routing
const { render } = require('ejs')
const express=require('express')
const router=express.Router()  
//เรียกใช้งานโมเดล
const Product=require('../models/products')
//อัพโหลดไฟล์
const multer =require('multer')


const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./public/images/products')//ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,callback){
        callback(null,Date.now()+".jpg") // เปลี่ยนชื่อไฟล์ป้องกันชื่อซ้ำ
    }
})
const upload=multer({
    storage:storage
})
router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
    res.render('index.ejs',{products:doc})
    })
    
    
})

router.get('/add-product',(req,res)=>{
    res.render('admin')
   // res.render('form')
})
router.get('/manage',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage.ejs',{products:doc})
        })
})
router.get('/delete/:id',(req,res)=>{
   Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
    res.redirect('/manage')
   })
})

router.post('/insert',upload.single("image"),(req,res)=>{
    console.log(req.file)
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
   Product.saveProduct(data,(err)=>{
    if(err) console.log(err)
    res.redirect('/')
   })
})

router.get('/:id',(req,res)=>{
    const product_id = req.params.id
    
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        res.render('product',{product:doc})
    })
    
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        res.render('edit.ejs',{product:doc})
    })
})

router.post('/update',(req,res)=>{
    
    const update_id=req.body.update_id
    let data = ({
        name:req.body.name,
        price:req.body.price,
        
        description:req.body.description
    })
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
        res.redirect('/manage')
    })
    })
    
router.post('/login',(req,res)=>{
    const username =req.body.username
    const password =req.body.password
    const timeExprice = 10000 // 10sec
    console.log(req.username)
    if(username === "admin" && password === "123"){
        res.cookie("username",username,{maxAge:timeExprice})
        res.cookie("password",password,{maxAge:timeExprice})
        res.cookie("login",true,{maxAge:timeExprice})
        res.redirect("/manage")
    }else{
        res.render('404')
    }
})

module.exports=router