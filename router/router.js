const express = require("express");
const { getAllProductTypes } = require("../controllers/ProductType");
const {
  getStaffById,
  deleteStaff,
  updateStaff,
  addStaff,
  getAllStaffs,
} = require("../controllers/Staff");
const {
  getAllCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/Customer");
const router = express.Router();

//ProductType
router.get("/ProductType/getProductTypes", getAllProductTypes);

//Staff
router.get("/StaffManagement/getStaffs", getAllStaffs);
router.post("/StaffManagement/add", addStaff);
router.put("/StaffManagement/update/:staffId", updateStaff);
router.delete("/StaffManagement/delete/:staffId", deleteStaff);
// router.get("/StaffManagement/Bills", getS);
router.get("/StaffManagement/staffById/:Id", getStaffById);

//Customer
router.get("/CustomerManagement/getCustomers", getAllCustomer);
router.post("/CustomerManagement/add", addCustomer);
router.put("/CustomerManagement/update/:staffId", updateCustomer);
router.delete("/CustomerManagement/delete/:staffId", deleteCustomer);
// router.get("/StaffManagement/Bills", getS);
router.get("/CustomerManagement/customerById/:Id", getCustomerById);

module.exports = router;
