import inquirer from 'inquirer';

async function selectUpdateOption() {
    const options = ['Title', 'Description', 'StartDate', 'DueDate', 'Completed'];

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'updateOption',
            message: 'Select the property to update:',
            choices: options,
        },
    ]);

    return answer.updateOption;
}


// selectUpdateOption();
export default selectUpdateOption;