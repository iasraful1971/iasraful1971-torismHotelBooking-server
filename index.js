const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;




///midleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhekc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
        try{
            await client.connect();
            const database = client.db('Hotel');
            const hotelServicesCollection = database.collection('hotel-service');
            //const orderCollection = database.collection('orders');

        //     //GET Order info
        //     app.get('orders/data' , async(req ,res) => {
        //         const result = await orderCollection.find({}).toArray();
        //         console.log('the order results' ,result);
        //         res.send(result);
        //     });        
          
        //     //get all data from one user
        //        app.post("/orders/data", async (req, res) => {
        //        const userEmail = req.query.email;
        //        const query = { userEmail: { $in: [userEmail] } };
        //        const result = await orderCollection.find(query).toArray();
        //       res.send(result);
        //  });
        //      //post one order from user
        //         app.post("/orders/data/book", async (req, res) => {
        //         const data = req.body;
        //         const result = await orderCollection.insertOne(data);
        //         res.json('get order one data',result);
        //       });
            
            //GET API
            app.get('/hotel_services', async(req ,res) =>{
                const cursor = hotelServicesCollection.find({});
                const hotelServices = await cursor.toArray();
                res.send(hotelServices);
            });

                //GET SINGLE SERVICE
                app.get('/hotel_services/:id' , async(req ,res) => {
                        const id = req.params.id;
                        console.log('getting sepcifice id' ,id);
                        const query = {_id: ObjectId(id)};
                        const service =await hotelServicesCollection.findOne(query);
                        res.json(service);
                });

            //post api
            app.post('/hotel_services', async(req ,res) => {
                const hotelService = req.body;
                console.log('hit the post api', hotelService);
                const result = await hotelServicesCollection.insertOne(hotelService);
                console.log(result);
                res.json(result);
            });

         

         
        }
        finally{
            // await client.close(); 
        }
}
run().catch(console.dir)



app.get('/' , (req , res) => {
    res.send("assigment 11 is runng...")
})
app.listen(port, ()=> {
    console.log('the port runng in', port);
})