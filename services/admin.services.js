const User = require('../models/user');

const fetchAllUsers = () => {
  return User.find().sort({'publishedAt': 'desc'});
};

const fetchPendingUsers = () => {
  return User.find({review: "PENDING"}).sort({'publishedAt': 'desc'});
};

const fetchUserbyId = (id) => {
  return User.findOne({objectId: id}).sort({'publishedAt': 'desc'});
};

module.exports = {
  fetchAllUsers,
  fetchPendingUsers,
  fetchUserbyId
}