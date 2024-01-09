const express = require("express");
const { getAllProductTypes } = require("../controllers/ProductType");
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
const router = express.Router();

//ProductType
router.get("/ProductType/getProductTypes", getAllProductTypes);
//Sale Product
router.get("/SaleProduct/getSaleProduct", getAllSaleProducts);
router.post("/SaleProduct/add", addSaleProduct);
router.put("/SaleProduct/update/:saleProductId", updateSaleProduct);
router.delete("/SaleProduct/delete/:saleProductId", deleteSaleProduct);
router.get("/SaleProduct/saleProductById/:Id", getSaleProductById);
//Staff
router.get("/StaffManagement/getStaffs", getAllStaffs);
router.post("/StaffManagement/add", addStaff);
router.put("/StaffManagement/update/:billId", updateStaff);
router.delete("/StaffManagement/delete/:billId", deleteStaff);
// router.get("/StaffManagement/Bills", getS);
router.get("/StaffManagement/staffById/:Id", getStaffById);

module.exports = router;
