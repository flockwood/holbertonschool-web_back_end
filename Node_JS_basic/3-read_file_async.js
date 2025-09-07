const fs = require('fs');

/**
 * Counts students from a CSV file asynchronously and displays statistics by field
 * @param {string} path - Path to the CSV database file
 * @returns {Promise} Promise that resolves when file is processed successfully
 * @throws {Error} Rejects with error if database cannot be loaded
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
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

        // Log total number of students
        console.log(`Number of students: ${validStudents.length}`);

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

        // Display students by field
        const fieldEntries = Object.entries(fields);
        fieldEntries.forEach(([field, names]) => {
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        });

        // Resolve the promise when done
        resolve();
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
