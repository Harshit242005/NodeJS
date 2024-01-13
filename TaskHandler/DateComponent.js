

import readline from 'readline-sync'
function getDateFromCommandLine(date_type) {
  try {
    // Prompt user for due date
    const dueDateInput = readline.question(`Enter ${date_type} date (dd/mm/yyyy): `);

    // Convert string to JavaScript Date object
    const dueDate = convertToDate(dueDateInput);

    // Format the date to dd/mm/yyyy
    const formattedDate = formatDate(dueDate);
    //console.log(typeof formattedDate);
    return formattedDate
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function convertToDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);

  // JavaScript months are 0-indexed, so we subtract 1 from the month
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export default {
  getDateFromCommandLine,
};