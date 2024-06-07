const express = require('express');
const { registerUser, authUser, updateUser, getInfo, changePassword, uploadCV, getCompletedPercentage} = require('../controllers/userControllers');
const { postCV , getCV,getCVEmail} = require('../controllers/cvControllers');

const router =  express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/update').put(updateUser)
router.route('/getInfo/:email').get(getInfo)
router.route('/changePassword').put(changePassword)
router.route('/uploadCV').put(uploadCV)
router.route('/getPercent').get(getCompletedPercentage)
router.route('/postCV').post(postCV)
router.route('/getCV/:cvId').get(getCV)
router.route('/getCVEmail/:email').get(getCVEmail)

module.exports = router;