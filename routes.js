require("dotenv-safe").config();
const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login');
const adminController = require('./controllers/admin');
const candidateController = require('./controllers/candidate');
const vacancyController = require('./controllers/vacancy');
const jwtVerification = require('./utils/jwtVerification');

router.post('/login', loginController.login);

//list all admins
router.get('/admin/all', jwtVerification, adminController.getAll);

//show an specific admin info
router.get('/admin/:user', jwtVerification, adminController.getAdmin);

//create an admin user
router.post('/admin/create', adminController.create);

//list all candidates
router.get('/candidate/all', jwtVerification, candidateController.getAll);

//show an specific candidate info
router.get('/candidate/:cpf', jwtVerification, candidateController.getCandidate);

//create an candidate user
router.post('/candidate/create', jwtVerification, candidateController.create);

//list all vacancies
router.get('/vacancy/all', vacancyController.getAll);

//show an specific vacancy info
router.get('/vacancy/:vacancyCode', vacancyController.getVacancy);

//create a vacancy
router.post('/vacancy/create', jwtVerification, vacancyController.create);

//set an user to an vacancy
router.post('/admin/set/:cpf/:vacancyCode', jwtVerification, adminController.setCandidateToVacancy);

module.exports = router;