const express = require('express');
const { 
  getAllUsers, 
  getPendingUsers, 
  getUserbyId, 
  updateUser 
} = require('../controllers/admin.controller');
const router = express.Router();

const pingTest = (req, res) => {
  console.log("Admin enpoints are up and running...🚀");
  return res.status(200).json({
    msg: 'Admin enpoints are up and running...🚀'
  });
}

// routing endpoints to middlewares
router.get('/admin/ping', pingTest);
router.get('/admin/view/all', getAllUsers);
router.get('/admin/view/pending', getPendingUsers);
router.get('/admin/view/user/:id', getUserbyId);
router.put('/admin/update/user/:id', updateUser);


module.exports = router;  