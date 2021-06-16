const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nazmulhuda:62968512ab@cluster0.0gacq.mongodb.net/project?retryWrites=true&w=majority";
const bodyParser = require('body-parser')
const ObjectId= require('mongodb').ObjectID;
const cors = require('cors')
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("project").collection("database");

   app.post('/addProduct',(req,res)=>{
       const product = req.body;
       console.log(product);
       collection.insertOne(product)
       .then(result=>{
           console.log('data added successfully check your database')
           res.redirect('/');
       })
   })

   app.get('/students',(req,res)=>{
       collection.find({})
       .toArray((err,documents)=>{
           res.send(documents);
       })
   })

   app.delete('/delete/:id',(req,res)=>{
       console.log(req.params.id);
       collection.deleteOne({_id:ObjectId(req.params.id)})
       .then(result=>{
           console.log(result);
       })
   })

   app.get('/student/:id',(req,res)=>{
       collection.find({_id:ObjectId(req.params.id)})
       .toArray((err,documents)=>{
           res.send(documents[0]);
       })
   })

   app.patch('/update/:id',(req,res)=>{
       collection.updateOne({_id:ObjectId(req.params.id)},
        {
            $set : {id:req.body.studentId, Department:req.body.department}
        }
       )
       .then(result=>{
           console.log(result);
       })
      
   })
 
});




app.listen(4000,()=>{
    console.log("Listening to the port 4000")
})