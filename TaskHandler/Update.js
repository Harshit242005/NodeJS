// here we would update user data
import { MongoClient } from 'mongodb';

async function updateTask(selected_task, selected_update, newValue) {
    try {
        const uri = process.env.CONNECTION_STRING;
        const client = new MongoClient(uri);

        try {
            await client.connect();
            const database = client.db('Task');
            const collection = database.collection('Tasks');

            const filter = { Title: selected_task };
            const update = { $set: { [selected_update]: newValue } };
            const result = await collection.updateOne(filter, update);

            if (result.modifiedCount > 0) {
                console.log(`Task updated successfully. Modified count: ${result.modifiedCount}`);
            } else {
                console.log('No matching task found for update.');
            }
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
export default updateTask;