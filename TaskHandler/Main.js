import readline from 'readline-sync';
import dotenv from 'dotenv';
import fs from 'fs';
import userDetails from './UserDetails.js';
import CreateTask from './CreateTask.js';
import dateComponent from './DateComponent.js';
import viewTasks from './ViewTask.js';
import getTaskTitles from './taskList.js';
import selectTask from './selectTask.js';
import selectUpdateOption from './selectUpdateType.js';
import updateTask from './Update.js';
// Load environment variables from the .env file
dotenv.config();

// Function to handle user commands
async function handleUserCommand(command) {
    switch (command) {
        case 'add_connection':
            const connectionString = userDetails.getConnectionString();
            fs.writeFileSync('.env', `CONNECTION_STRING=${connectionString}\n`, { flag: 'a' });
            console.log('Connection string added successfully.');
            break;

        case 'change_connection':
            userDetails.changeConnectionString();
            break;

        case 'create_task':
            const createTaskInstance = new CreateTask();
            const title = readline.question('Enter task title: ');
            const description = readline.question('Enter task description: ');
            const start_date = dateComponent.getDateFromCommandLine('start');
            const due_date = dateComponent.getDateFromCommandLine('due');
            const priority = parseInt(readline.question('Enter task priority (0-10): '), 10);
            await createTaskInstance.createTask(title, description, start_date, due_date, priority);
            break;

        case 'view_tasks':
            viewTasks();
            break;

        case 'details':
            // function to run important details
            break;

        case 'update_task':
            try {
                const tasks = await getTaskTitles();
                const selected_task = await selectTask(tasks);
                const selected_update = await selectUpdateOption();
                let newValue;
                switch (selected_update) {
                    case 'Title':
                        newValue = readline.question('Enter the new title: ');
                        console.log(`new value typed by the user ${newValue}`);
                        break;
                    case 'Description':
                        newValue = readline.question('Enter the new description: ');
                        console.log(`new value typed by the user ${newValue}`);
                        break;
                    // Add cases for other update types
                    case 'Priority':
                        newValue = readline.question('Enter the new priority(0-10): ');
                        console.log(`new priority value by user: ${newValue}`);
                        break;
                    case 'Completed':
                        newValue = readline.question('Select true or false for the task: ');
                        console.log(`new value typed by the user ${newValue}`);
                        break;
                    default:
                        console.log('Invalid update type.');
                        break;
                }
                console.log(updateTask(selected_task, selected_update, newValue));
            } catch (error) {
                console.error('Error:', error.message);
            }
            
        default:
            break;
    }
}

// Retrieve the user command from the command-line arguments
const userCommand = process.argv[2]; // Assuming the command is the third argument

// Call the function based on the user command
handleUserCommand(userCommand);