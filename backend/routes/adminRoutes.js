const express = require('express');
const router =  express.Router();
const { registerAdminUser, updateJobStatus, getUsers, deleteUser, toggleUserStatus,getStatus, getPendingJobs } = require('../controllers/adminController');
const { protect } = require('../middlewares/adminMiddleware');

router.route('/register').post(registerAdminUser);
router.route('/updateJobStatus').put(updateJobStatus)
router.route('/getUsers').get(protect, getUsers);
router.route('/deleteUser').delete(deleteUser);
router.route('/toggleUserStatus').patch(toggleUserStatus);
router.route('/getStatus').get(getStatus);
router.route('/getPendingJobs').get(getPendingJobs);

module.exports = router;