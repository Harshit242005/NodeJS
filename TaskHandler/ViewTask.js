// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';
async function viewTasks() {
    let client;
    try {
        // Create a new MongoClient
        client = new MongoClient(process.env.CONNECTION_STRING);

        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database
        const database = client.db('Task');

        // Select the collection
        const collection = database.collection('Tasks');

        // Query the database to retrieve tasks
        const tasks = await collection.find().toArray();

        // Display the tasks in the console
        if (tasks.length > 0) {
            console.log('Tasks:');
            tasks.forEach(task => {
                console.log(`${task.Title}`);
            });
        } else {
            console.log('No tasks found.');
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error.message);
    } finally {
        // Disconnect from MongoDB
        await client.close();
    }
}

export default viewTasks;