const express = require('express');
const { registerCorporateUser, getInfo,getMyJobs,getMyJobCount,updateUser,changePassword } = require('../controllers/corporateController');

const router =  express.Router();
const { protect } = require('../middlewares/corporateMiddleware');

router.route('/register').post(registerCorporateUser);
router.route('/changePassword').put(protect,changePassword);
router.route('/getInfo').get(getInfo);
router.route('/getMyJobs').get(getMyJobs);
router.route('/getMyJobCount').get(getMyJobCount);
router.route('/updateUser').put(updateUser);



module.exports = router;