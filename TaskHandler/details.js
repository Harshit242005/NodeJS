// here we would be adding a function that would accept some user prompts and save them in 
import readline from 'readline';
import { MongoClient } from 'mongodb';
require('dotenv').config();
import inquirer from 'inquirer';

// function for the user data gathering
async function user_data() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an option:',
            choices: [
                { name: 'Add details', value: 'addDetails' },
                { name: 'Change Email', value: 'changeEmail' },
                { name: 'View details', value: 'viewDetails' },
                { name: 'Exit', value: 'exit' },
            ],
        },
    ]);

    switch (answer.action) {
        case 'addDetails':
            await addDetails();
            break;
        case 'viewDetails':
            // Implement viewDetails() function
            console.log('View details functionality not implemented yet.');
            break;
        case 'changeEmail':
            // function to change the email [ we would be passing new value with the old value to check up ]
            await changeEmailPrompt(rl);
            break;
        case 'exit':
            console.log('Exiting...');
            break;
        default:
            console.log('Invalid option. Exiting...');
            break;
    }
}

async function changeEmailPrompt(rl) {
    const oldEmail = await askQuestion(rl, 'Enter the old email: ');
    const newEmail = await askQuestion(rl, 'Enter the new email: ');

    // Call the function to change the email
    await changeEmail(oldEmail, newEmail);
}

// adding user data as a document in the collections 
async function addDetails() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try {
        // Prompt the user for details
        const email = await askQuestion(rl, 'Enter your email: ');
        const reminderTime = await askQuestion(rl, 'Enter reminder time (HH:MM AM/PM): ');
        const receiveReminderEmail = await askYesNoQuestion(rl, 'Do you want to receive reminder emails? (yes/no): ');

        // Parse reminder time
        const [hour, minute, period] = reminderTime.match(/(\d{1,2}):(\d{2}) ([APMapm]{2})/).slice(1);
        const reminderTimeObj = { hour, minute, period };
        console.log(reminderTimeObj)
        // Create a Date object with the current date
        const currentDate = new Date();
        const lastDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        user_data = {
            "Email": email,
            "ReminderTime": reminderTimeObj,
            "ReceiverReminderEmail": receiveReminderEmail.toLowerCase() === 'yes',
            "LastDate": lastDate,
        }
        console.log(user_data);
        // Save details to the database
        await addDetailsToDatabase(user_data);
    } catch (error) {
        console.error('Error adding details:', error);
    } finally {
        // Close the readline interface
        rl.close();
    }
}

function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function askYesNoQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            const lowercaseAnswer = answer.trim().toLowerCase();
            resolve(lowercaseAnswer === 'yes' || lowercaseAnswer === 'y');
        });
    });
}

// function to save the data by the user as the important data
async function addDetailsToDatabase(user_data) {
    const connectionString = process.env.MONGO_CONNECTION_STRING;
    const databaseName = 'Task';
    const collectionName = 'Details';

    const client = new MongoClient(connectionString, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Insert the user_data as a document in the collection
        const result = await collection.insertOne(user_data);

        console.log('Document added with ID:', result.insertedId);
    } catch (error) {
        console.error('Error adding document to the database:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}


// Function to change the email in the database for the mailing
async function changeEmail(oldEmail, newEmail) {
    const connectionString = process.env.MONGO_CONNECTION_STRING;
    const databaseName = 'Task';
    const collectionName = 'Details';

    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Find the document with the old email
        const documentToUpdate = await collection.findOne({ "Email": oldEmail });

        if (!documentToUpdate) {
            console.log(`Document with old email "${oldEmail}" not found.`);
            return;
        }

        // Update the email with the new value
        const result = await collection.updateOne(
            { "_id": documentToUpdate._id },
            { $set: { "Email": newEmail } }
        );

        console.log(`Document updated with ID: ${documentToUpdate._id}`);
    } catch (error) {
        console.error('Error updating document in the database:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}
