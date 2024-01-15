
import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

class CreateTask {
    async createTask(Title, Description, StartDate, DueDate, Priority) {
        const uri = process.env.CONNECTION_STRING;
        console.log(uri);

        // Declare the client variable outside the try block
        let client;

        try {
            // Create a new MongoClient
            client = new MongoClient(uri);

            // Connect to the MongoDB server
            await client.connect();
            console.log('Connected to MongoDB');

            // Select the database
            const database = client.db('Task'); // Replace 'YourDatabaseName' with your actual database name

            // Select the collection
            const collection = database.collection('Tasks'); // Replace 'Tasks' with your actual collection name

            // Create a new task document
            const newTask = {
                Title,
                Description,
                DueDate,
                StartDate,
                Complete: false,
                Priority,
            };

            // Insert the task document into the collection
            const result = await collection.insertOne(newTask);

            console.log(`Task created successfully. Inserted ID: ${result.insertedId}`);
        } catch (error) {
            console.error('Error creating task:', error.message);
        } finally {
            // Disconnect from MongoDB in the finally block
            if (client) {
                await client.close();
                console.log('Disconnected from MongoDB');
            }
        }
    }
}

export default CreateTask;
