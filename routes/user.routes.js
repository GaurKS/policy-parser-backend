const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// importing controls from controller
const { uploadPDF } = require('../controllers/user.controller');


const pingTest = (req, res) => {
  console.log("User enpoints are up and running...🚀");
  return res.status(200).json({
    msg: 'User enpoints are up and running...🚀'
  });
}


// routing endpoints to middlewares
router.get('/user/ping', pingTest);
router.post('/user/upload', upload.single('file'), uploadPDF);

module.exports = router;