const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Load environment variables from .env file
require('dotenv').config();

// Middleware
const cors = require('cors');
const bodyParser = require('body-parser');

// Set up port
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: ['https://social-media-b74b2.web.app', 'http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
}

// Use middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.8ldebrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Async function to initialize the server
async function run() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Define database collections
    const usersDb = client.db("social-media").collection('users');
    const usersPostDb = client.db("social-media").collection('users-posts');



    // Route to search for a user by ID
    app.get('/searchUser', async (req, res) => {
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


    // Route to fetch combined data of a user
    app.get('/combinedData', async (req, res) => {
      try {
        const userId = req.query.userId;

        // Fetch user data
        const userData = await usersDb.findOne({ _id: new ObjectId(userId) });
        if (!userData) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Fetch user posts
        const userPosts = await usersPostDb.find({ userProfileId: userId }).sort({ createdAt: -1 }).toArray();
        if (userPosts.length === 0) {
          return res.status(404).json({ error: 'No posts found for this user' });
        }

        // Combine user data and user posts
        const combinedData = { userData, userPosts };

        // Send the combined data as the response
        res.status(200).json(combinedData);
      } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


    // Route to login a user
    app.get('/loginUser', async (req, res) => {
      try {
        // Retrieve UID from the query parameters
        const email = req.query.email;


        // Find the user with the matching UID
        const user = await usersDb.findOne({ email: email });

        if (user) {
          // If user found, send the user data as response
          res.status(200).json(user);
        } else {
          // If user not found, send a 404 error response
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        // If any error occurs, send a 500 error response
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    // Route to fetch user by ID

    app.get('/userId', async (req, res) => {
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



    // Route to fetch all users
    app.get('/allUsers', async (req, res) => {
      try {
        const result = await usersDb.find().toArray();
        res.json(result);
      } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });



    // Route to register a new user
    app.post('/createUser', async (req, res) => {
      try {
        const body = req.body;
        console.log(body);

        // Check if the email already exists in the database
        const existingUser = await usersDb.findOne({ email: body.email });

        if (existingUser) {
          // If the email already exists, send a response indicating that the user already exists
          return res.status(400).json({ message: 'User with this email already exists' });
        }

        // If the email doesn't exist, insert the new user data
        const result = await usersDb.insertOne(body);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });



    // Route to create a new user post
    app.post('/createUserPost', async (req, res) => {
      try {
        const currentDate = new Date(); // Get the current date and time
        const body = req.body;
        body.createdAt = currentDate.toISOString(); // Convert current date to ISO string format

        const result = await usersPostDb.insertOne(body);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error creating user post:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });



    // Ping MongoDB deployment
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Close MongoDB client
    // await client.close();
  }
}

// Run the server
run().catch(console.dir);

// Default route
app.get('/', (req, res) => {
  res.send('Social Media Server is running...')
})

// Start listening on the defined port
app.listen(port, () => {
  console.log(`Social Media is running on port ${port}`)
})
