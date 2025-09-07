import { Router } from 'express';
import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * Configure routes for the Express application
 */
const router = Router();

// Link root route to AppController
router.get('/', AppController.getHomepage);

// Link student routes to StudentsController
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

export default router;