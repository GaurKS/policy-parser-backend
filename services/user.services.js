const User = require('../models/user');

const generateObjectId = (prefix, length = 8) => {
  let id = prefix || '';
  // Always start the id with a char
  id += (Math.floor(Math.random() * 25) + 10).toString(36);
  // Add a timestamp in milliseconds (base 36) for uniqueness
  id += new Date().getTime().toString(36);
  // Similar to above, complete the Id using random, alphanumeric characters
  do {
    id += Math.floor(Math.random() * 35).toString(36);
  } while (id.length < length);
  return id;
};

const createUser = async(id, url) => {
  const newUser = new User({
    objectId: id,
    policyUrl: url,
  });

  newUser.save((err, newUser) => {
    if (err) {
      console.log('Error in saving user data in DB', err);
      return null;
    }
    return newUser.objectId;
  })
};

module.exports = {
  generateObjectId,
  createUser
}