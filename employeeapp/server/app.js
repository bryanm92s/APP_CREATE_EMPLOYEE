const express=require('express')
const app =express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

require('./Employee')

app.use(bodyParser.json())


const Employee=mongoose.model("employee")


const mongoUri="mongodb+srv://bgm:5SepA1DP4GKW38V2@cluster0-m5l3c.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo OK")
})

mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})

app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)

    }).catch(err=>{
        console.log(err)
    })
})


app.post('/send-data',(req,res)=>{
    const employee=new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)

    })
   
})



app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})



       // "name":"Usuario1",
       // "email":"usuario@gmail.com",
       // "phone":"789654321",
       // "picture":"some url",
       // "salary":"500000",
       // "position":"Design"

       

app.listen(3000,()=>{
    console.log("server running")
})