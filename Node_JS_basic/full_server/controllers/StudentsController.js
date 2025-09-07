import readDatabase from '../utils';

/**
 * Students controller for handling student-related routes
 */
class StudentsController {
  /**
   * Handles GET request to retrieve all students
   * @param {Object} request - Express request object
   * @param {Object} response - Express response object
   */
  static getAllStudents(request, response) {
    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((fields) => {
        let output = 'This is the list of our students\n';

        // Sort fields alphabetically (case insensitive)
        const sortedFields = Object.keys(fields).sort((a, b) => {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        // Build output for each field
        sortedFields.forEach((field) => {
          const names = fields[field];
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        });

        // Remove last newline and send response
        response.status(200).send(output.trim());
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  /**
   * Handles GET request to retrieve students by major
   * @param {Object} request - Express request object
   * @param {Object} response - Express response object
   */
  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    // Validate major parameter
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((fields) => {
        const names = fields[major] || [];
        response.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
