const express = require('express');
const fs = require('fs');

/**
 * Counts students from a CSV file asynchronously
 * @param {string} path - Path to the CSV database file
 * @returns {Promise<string>} Promise that resolves with formatted student data
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        // Split by lines and filter out empty lines
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        // Remove header line (first line contains column names)
        const students = lines.slice(1);

        // Filter out any remaining empty entries
        const validStudents = students.filter((student) => student.length > 0);

        // Build output string
        let output = `Number of students: ${validStudents.length}\n`;

        // Create a map to group students by field
        const fields = {};

        // Process each student
        validStudents.forEach((student) => {
          const studentData = student.split(',');
          // Assuming CSV format: firstname,lastname,age,field
          const firstname = studentData[0];
          const field = studentData[3];

          if (field) {
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstname);
          }
        });

        // Add students by field to output
        const fieldEntries = Object.entries(fields);
        fieldEntries.forEach(([field, names]) => {
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        });

        // Remove the last newline for clean output
        resolve(output.trim());
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

/**
 * Create Express server
 */
const app = express();

/**
 * Define route for root endpoint
 */
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

/**
 * Define route for students endpoint
 */
app.get('/students', async (req, res) => {
  res.type('text/plain');
  
  // Start with the header message
  let response = 'This is the list of our students\n';
  
  // Get database filename from command line arguments
  const database = process.argv[2];
  
  try {
    const studentData = await countStudents(database);
    response += studentData;
    res.send(response);
  } catch (error) {
    response += error.message;
    res.send(response);
  }
});

// Listen on port 1245
const PORT = 1245;
app.listen(PORT);

// Export the app
module.exports = app;
