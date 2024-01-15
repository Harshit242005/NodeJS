import fs from 'fs';
import readline from 'readline-sync';

class UserDetails {
  getConnectionString() {
    return readline.question('Enter MongoDB database connection string: ');
  }

  changeConnectionString() {
    const newConnectionString = readline.question('Enter the new MongoDB database connection string: ');

    // Read the existing content of .env
    const envContent = fs.readFileSync('.env', 'utf-8');

    // Replace the existing CONNECTION_STRING value
    const updatedEnvContent = envContent.replace(/CONNECTION_STRING=.*/, `CONNECTION_STRING=${newConnectionString}`);

    // Update the .env file with the modified content
    fs.writeFileSync('.env', updatedEnvContent);
    console.log('Connection string updated successfully.');
  }
}

export default UserDetails;
