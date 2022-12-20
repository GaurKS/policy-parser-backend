const user = require("../models/user");
const { fetchAllUsers, fetchPendingUsers, fetchUserbyId } = require("../services/admin.services");

const getAllUsers = async(req, res) => {
  const data = await fetchAllUsers();
  console.log("Users: ", data);
  return res.status(200).json({
    msg: "All users fetched successfully",
    data: data
  })
};

const getPendingUsers = async(req, res) => {
  const data = await fetchPendingUsers();
  console.log("Users: ", data);
  return res.status(200).json({
    msg: "All users fetched successfully",
    data: data
  })
};

const getUserbyId = async(req, res) => {
  const id = req.params.id;
  const data = await fetchUserbyId(id);
  return res.status(200).json({
    msg: "All users fetched successfully",
    data: data
  })
};

const updateUser = async(req, res) => {
  const {id} = req.params;
  const {name, policyNo, contactNo, address} = req.body;

  const data = await fetchUserbyId(id);
  if (!data) {
    return res.status(500).json({
      msg: "User does not exist",
    })
  }

  const updatedUser = await user.updateOne({
    name: name,
    policyNo: policyNo,
    contactNo: contactNo,
    address: address,
    review: "REVIEWED"
  });
  console.log("User update: ", id);

  return res.status(201).json({
    msg: "User updated successfully",
    objectId: id
  });
};

module.exports = {
  getAllUsers,
  getPendingUsers,
  getUserbyId,
  updateUser
}