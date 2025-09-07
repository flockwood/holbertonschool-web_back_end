/**
 * App controller for handling basic routes
 */
class AppController {
  /**
   * Handles GET request for homepage
   * @param {Object} request - Express request object
   * @param {Object} response - Express response object
   */
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
