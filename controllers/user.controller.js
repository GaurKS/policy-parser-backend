const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config();
const { createUser, generateObjectId } = require('../services/user.services');


// const serviceAccount = {
//   "type": process.env.GCS_TYPE,
//   "project_id": process.env.GCS_PROJECT_ID,
//   "private_key_id": process.env.GCS_PRIVATE_KEY_ID,
//   "private_key": process.env.GCS_PRIVATE_KEY,
//   "client_email": process.env.GCS_CLIENT_EMAIL,
//   "client_id": process.env.GCS_CLIENT_ID,
//   "auth_uri": process.env.GCS_AUTH_URI,
//   "token_uri": process.env.GCS_TOKEN_URI,
//   "auth_provider_x509_cert_url": process.env.GCS_AUTH_PROVIDER_URL,
//   "client_x509_cert_url": process.env.GCS_CLIENT_URL
// }


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://policymanager-34a0a.appspot.com'
});


const uploadPDF = async(req, res) => {
  try{
    const pdf = req.file;
    let accessToken = generateObjectId('Ou_');
    const fileName = accessToken + '_' + pdf.originalname;

    // Upload the PDF to Cloud Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: pdf.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: accessToken
        }
      }
    });

    stream.on('error', (error) => {
      console.log("Error while uploading :", error)
      res.send(`Error uploading PDF: ${error}`);
    });

    stream.on('finish', () => {
      let url = 'https://firebasestorage.googleapis.com/v0/b/policymanager-34a0a.appspot.com/o/'+ fileName + '?alt=media&token=' + accessToken;
      console.log("URL :", url);
      console.log("User id: ", accessToken);
      createUser(accessToken, url);
      res.status(201).json({
        msg: "User added successfully", 
        objectId: accessToken,
        fileName: fileName, 
        url: url
      });
    });
    stream.end(pdf.buffer);
  } 
  catch (err) {
    console.log("Error uploading pdf: ", err);
    res.status(400).send(err);
  }
}

module.exports = {
  uploadPDF
}