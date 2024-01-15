import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file

async function getTaskTitles() {
    let client; // Declare client outside the try block to make it accessible in the finally block
    try {
        const connect_string = process.env.CONNECTION_STRING;
        console.log('Connection String:', connect_string); // Log the connection string
        client = new MongoClient(connect_string);
        await client.connect();
        const database = client.db('Task');
        const collection = database.collection('Tasks');
        const tasks = await collection.find().toArray();
        return tasks.map(task => task.Title); // Extract only the titles
    } catch (error) {
        console.error('Error retrieving task titles:', error.message);
        return [];
    } finally {
        if (client) {
            await client.close(); // Close the MongoDB client in the finally block
            console.log("Function ended successfully");
        }
    }
}


export default getTaskTitles;