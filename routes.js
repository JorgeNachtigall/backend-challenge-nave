require("dotenv-safe").config();
const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login');
const adminController = require('./controllers/admin');
const candidateController = require('./controllers/candidate');
const vacancyController = require('./controllers/vacancy');
const jwtVerification = require('./utils/jwtVerification');

router.post('/login', loginController.login);

//create an admin user
router.post('/account/create/admin', jwtVerification, adminController.create);

//create an candidate user
router.post('/account/create/candidate', jwtVerification, candidateController.create);

//list all admins
router.get('/account/show/admin/all', jwtVerification, adminController.showAll);

//show an specific admin info
router.get('/account/show/admin/:user', jwtVerification, adminController.showAdmin);

//list all candidates
router.get('/account/show/candidate/all', jwtVerification, candidateController.showAll);

//show an specific candidate info
router.get('/account/show/candidate/:cpf', jwtVerification, candidateController.showCandidate);

//create a vacancy
router.post('/vacancy/create', jwtVerification, vacancyController.create);

//list all vacancies
router.get('/vacancy/show/all', jwtVerification, vacancyController.showAll);

//show an specific vacancy info
router.get('/vacancy/show/:vacancyCode', jwtVerification, vacancyController.showVacancy);

//set an user to an vacancy
router.post('/candidatures/create/:cpf/:vacancyCode', jwtVerification, candidateController.setCandidateToVacancy);

//create a comment to an candidature
router.post('/comment/create/:idCandidature', jwtVerification, adminController.comment);

//show all comments of an candidature
router.get('/comment/show/:idCandidature', jwtVerification, adminController.showCandidatureCommentById);

router.get('/candidatures/show/all', jwtVerification, adminController.showAllCandidatures);

router.get('/candidatures/show/candidate/:cpf', jwtVerification, candidateController.showCandidaturesOfCandidate);

router.get('/candidatures/show/vacancy/:vacancyCode', jwtVerification, vacancyController.showVacancyCandidatures);

module.exports = router;