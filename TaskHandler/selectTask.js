import inquirer from 'inquirer';

async function selectTask(task_list) {
    try {
        
        if (task_list.length > 0) {
            const selectedTask = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectedTask',
                    message: 'Select a task:',
                    choices: task_list,
                },
            ]);
            return selectedTask.selectedTask;
        } else {
            console.log('No tasks found.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

export default selectTask;