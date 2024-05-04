const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const cors = require('cors')


const port = process.env.PORT || 5000


// middleware ---- use
const corsOptions = {
    origin: ['http://localhost:5173','https://e-commerce-bazar.web.app'],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

// mongodb db uri -----------------------

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.8ldebrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {

      
        const usersDb = client.db("e-commerce-bazar").collection('users')
        



app.get('/user',async (req, res) => {
    try {
        const id = req.query.id; // Extract the _id from the query parameters
        // Use Mongoose to find a user with the specified _id
        const userData = await usersDb.findOne({ _id: new ObjectId(id) });
        if (!userData) {
            // If no user is found with the provided _id, return a 404 Not Found response
            return res.status(404).json({ error: 'User not found' });
        }
        // If a user is found, send the user data as JSON response
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching data:', error);
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/userId',  async (req, res) => {
    try {
        const id = req.query.id; // Extract the _id from the query parameters
        // Use Mongoose to find a user with the specified _id
        const userData = await usersDb.findOne({ _id: new ObjectId(id) });
        if (!userData) {
            // If no user is found with the provided _id, return a 404 Not Found response
            return res.status(404).json({ error: 'User not found' });
        }
        // If a user is found, send the user data as JSON response
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching data:', error);
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




        // Route to register a new user
        app.post('/user', async (req, res) => {
            try {
                const body = req.body;
                const result = await usersDb.insertOne(body)
                res.send(result)
               
            } catch (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });






 
   

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Social Media  Server Server is running...')
})

app.listen(port, () => {
    console.log(`Social Media  is running on port ${port}`)
})