import express  from 'express';
var router = express.Router();


import directoryRouter from './controllers/directoryController.js';
import profileRouter from './controllers/profile.js';

router.use('/profile', profileRouter);
router.use('/directory', directoryRouter);

export default router;