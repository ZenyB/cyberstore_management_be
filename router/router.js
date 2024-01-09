const express = require("express");
const { getAllCompany } = require("../controllers/Company");
const {
  getProductById,
  deleteProduct,
  updateProduct,
  addProduct,
  getAllProducts,
} = require("../controllers/Product");
const {
  getSaleProductById,
  deleteSaleProduct,
  updateSaleProduct,
  addSaleProduct,
  getAllSaleProducts,
} = require("../controllers/SaleProduct");
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
router.get("/Company/getCompanys", getAllCompany);
//Sale Product
router.get("/Product/getProduct", getAllProducts);
router.post("/Product/add", addProduct);
router.put("/Product/update/:ProductId", updateProduct);
router.delete("/Product/delete/:ProductId", deleteProduct);
router.get("/Product/ProductById/:Id", getProductById);
//Product
router.get("/SaleProduct/getSaleProduct", getAllSaleProducts);
router.post("/SaleProduct/add", addSaleProduct);
router.put("/SaleProduct/update/:saleProductId", updateSaleProduct);
router.delete("/SaleProduct/delete/:saleProductId", deleteSaleProduct);
router.get("/SaleProduct/saleProductById/:Id", getSaleProductById);
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
