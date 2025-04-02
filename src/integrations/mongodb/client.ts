
import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace this with your actual MongoDB connection string
// For security, this should be stored in an environment variable
const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connection function to be used in an async context
export async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    
    // Return the database instance
    return client.db("spiritual_guidance");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Function to close the connection when needed
export async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}

export { client };
