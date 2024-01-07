const express = require("express");
const { getAllProductTypes } = require("../controllers/ProductType");
const router = express.Router();

//ProductType
router.get("/ProductType/getProductTypes", getAllProductTypes);

module.exports = router;
