//ใช้งาน mongoose
const mongoose = require('mongoose')

//เชื่อม mongodb
const dbUrl='mongodb://127.0.0.1:27017/productBD'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

//ออกแบบ schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String

})

//สร้างโมเดล
const Product = mongoose.model("products",productSchema)

//ส่งออกโมเดล
module.exports=Product

//ออกแบบฟังชั้นบันทึกข้อมูล
module.exports.saveProduct=function(model,data){
    model.save(data)
}
