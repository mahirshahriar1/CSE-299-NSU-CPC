const express = require('express');
const router =  express.Router();
const { postJob, listJobs,getJob,closeJob, deleteJob, updateJob, updateJobImage} = require('../controllers/jobController');
const { protect } = require('../middlewares/corporateMiddleware');

router.route('/post').post(postJob);
router.route('/list').get(listJobs);
router.route('/view').get(getJob);
router.route('/close').post(protect, closeJob);
router.route('/delete').post(protect, deleteJob);
router.route('/update').put(protect, updateJob);
router.route('/updateImage').put(updateJobImage);

module.exports = router;