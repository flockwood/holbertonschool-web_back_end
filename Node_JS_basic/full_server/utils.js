import fs from 'fs';

/**
 * Reads a CSV database file and returns student data grouped by field
 * @param {string} filePath - Path to the CSV database file
 * @returns {Promise<Object>} Promise that resolves with students grouped by field
 */
const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        // Split by lines and filter out empty lines
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        // Remove header line (first line contains column names)
        const students = lines.slice(1);

        // Filter out any remaining empty entries
        const validStudents = students.filter((student) => student.length > 0);

        // Create a map to group students by field
        const fields = {};

        // Process each student
        validStudents.forEach((student) => {
          const studentData = student.split(',');
          // CSV format: firstname,lastname,age,field
          const firstname = studentData[0];
          const field = studentData[3];

          if (field) {
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstname);
          }
        });

        resolve(fields);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export default readDatabase;
