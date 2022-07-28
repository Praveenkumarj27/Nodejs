const express=require('express');
const app=express();
const cors=require('cors');
const mongodb=require('mongodb');
const { response } = require('express');
const mongoClient=mongodb.MongoClient;
const dotenv=require("dotenv").config();
// const url="mongodb://localhost:27017"
const url=process.env.DB

//Middleware
app.use(express.json());

app.use(cors({
    origin:"*"
}))

app.get('/', function (req,res) {
    // res.send("Hello API")
    res.json({
        message:"Welcome to the API"
    })
});  

app.post('/student',async function (req,res){
    try {
    const connection= await mongoClient.connect(url)                   //open connection
  
    const db=connection.db("b35wd-tamil")                             //Select DB
   
    await db.collection ("students").insertOne(req.body)              //Select collection and do the operation
  
    await connection.close()                                           //Close the connection
                                      
    res.json({
             message:"Student added sucessfully"
         })
    } catch (error) {
        console.log(error);
    }

   
})

app.get('/students',async function (req,res) {
    try {
        const connection= await mongoClient.connect(url)                             //open connection
      
        const db=connection.db("b35wd-tamil")                                         //Select DB
       
        let students=  await db.collection ("students").find().toArray()              //Select collection and do the operation
      
        await connection.close()                                                      //Close the connection
          
        res.json(students)                               
        } catch (error) {
            console.log(error);
        }
    
});



app.get('/student/:id',async function(req,res){

    try {
        const connection= await mongoClient.connect(url)                   //open connection
      
        const db=connection.db("b35wd-tamil")                             //Select DB
       
        let students=  await db.collection ("students").findOne({_id:mongodb.ObjectId(req.params.id)})              //Select collection and do the operation
      
        await connection.close()                                           //Close the connection
                                          
        res.json(students) 

        } catch (error) {
            console.log(error);
        }

   
})


app.put('/student/:id',async function(req,res){

    try {
        const connection= await mongoClient.connect(url)                                                                              //open connection
      
        const db=connection.db("b35wd-tamil")                                                                                           //Select DB
       
        let student=  await db.collection ("students").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})              //Select collection and do the operation
      
        await connection.close()                                                                                                       //Close the connection
                                          
        res.json({
            message:"Edited Sucessfully"
        })
        } catch (error) {
            console.log(error);
        }


    app.delete('/student/:id',async function(req,res){
        try {
            const connection= await mongoClient.connect(url)                   //open connection
          
            const db=connection.db("b35wd-tamil")                             //Select DB
           
            let students=  await db.collection ("students").deleteOne({_id:mongodb.ObjectId(req.params.id)})              //Select collection and do the operation
          
            await connection.close()                                           //Close the connection
                                              
            res.json({
                message:"Student deleted sucessfully"
            })
            } catch (error) {
                console.log(error);
            }
    
       
    })
})

app.listen(process.env.PORT|| 3001);








