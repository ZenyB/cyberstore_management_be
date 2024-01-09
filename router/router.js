const express = require("express");
const { getAllProductTypes } = require("../controllers/ProductType");
const {
  getStaffById,
  deleteStaff,
  updateStaff,
  addStaff,
  getAllStaffs,
} = require("../controllers/Staff");
const router = express.Router();

//ProductType
router.get("/ProductType/getProductTypes", getAllProductTypes);

//Staff
router.get("/StaffManagement/getStaffs", getAllStaffs);
router.post("/StaffManagement/add", addStaff);
router.put("/StaffManagement/update/:billId", updateStaff);
router.delete("/StaffManagement/delete/:billId", deleteStaff);
// router.get("/StaffManagement/Bills", getS);
router.get("/StaffManagement/staffById/:Id", getStaffById);

module.exports = router;
