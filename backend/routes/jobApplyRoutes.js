const express = require('express');
const { applyJob , getAppliedJobs, deleteApplication, getAppliedCandidates,isAlreadyApplied,getCountofAppliedCandidates, getCount , getMyJobs} = require('../controllers/jobApplyController');

const router =  express.Router();

router.route('/apply').post(applyJob);
router.route('/list-applied-jobs').get(getAppliedJobs)
router.route('/list-my-jobs').get(getMyJobs)
router.route('/delete').delete(deleteApplication)
router.route('/candidates').get(getAppliedCandidates)
router.route('/countMyJobs').get(getCount)
router.route('/isApplied').get(isAlreadyApplied)
router.route('/countCandidates').get(getCountofAppliedCandidates)


module.exports = router;