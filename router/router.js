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
const {
  getAllDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
} = require("../controllers/Discount");
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
router.put("/CustomerManagement/update/:customerId", updateCustomer);
router.delete("/CustomerManagement/delete/:customerId", deleteCustomer);
// router.get("/StaffManagement/Bills", getS);
router.get("/CustomerManagement/customerById/:Id", getCustomerById);

//Discount
router.get("/DiscountManagement/getDiscounts", getAllDiscount);
router.post("/DiscountManagement/add", addDiscount);
router.put("/DiscountManagement/update/:discountId", updateDiscount);
router.delete("/DiscountManagement/delete/:discountId", deleteDiscount);
// router.get("/StaffManagement/Bills", getS);
router.get("/DiscountManagement/discountById/:Id", getDiscountById);

module.exports = router;
