const {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
  } = require("firebase/firestore");
  const { firebase } = require("../config");
  const firestore = getFirestore(firebase);
  
  const getAllSaleProducts = async (req, res) => {
    const myCollection = collection(firestore, "SaleProduct");
    try {
      const querySnapshot = await getDocs(myCollection);
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
      const newList = list.sort((a, b) => a.saleProductId.localeCompare(b.saleProductId));
      res.json({ success: true, saleProducts: newList });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from sale product",
      });
      console.log(error);
      return [];
    }
  };
  
  const addSaleProduct = async (req, res) => {
    try {
      const myCollection = collection(firestore, "SaleProduct");
      const docRef = await addDoc(myCollection, req.body);
      console.log("Document SaleProduct successfully add!");
      res.send({
        success: true,
        message: "SaleProduct added successfully",
        docId: docRef.id,
      });
    } catch (error) {
      console.error("Error adding document SaleProduct: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when adding SaleProduct",
      });
    }
  };
  
  const updateSaleProduct = async (req, res) => {
    try {
      const myCollection = collection(firestore, "SaleProduct");
      const docRef1 = doc(myCollection, req.params.saleProductId);
      let data = req.body;
      await updateDoc(docRef1, data);
      console.log("Document SaleProduct successfully updated!");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.error("Error updating SaleProduct document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when update document",
      });
    }
  };
  
  const deleteSaleProduct = async (req, res) => {
    try {
      const documentRef = doc(firestore, "SaleProduct", req.params.saleProductId);
      await deleteDoc(documentRef);
      console.log("Document SaleProduct deleted successfully.");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.log("Error deleting SaleProduct document:", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when delete document",
      });
    }
  };
  
  const getSaleProductById = async (req, res) => {
    try {
      const myCollection = collection(firestore, "SaleProduct");
      const docRef1 = doc(myCollection, req.params.Id);
      const documentSnapshot = await getDoc(docRef1);
  
      if (documentSnapshot.exists()) {
        res.send({ success: true, saleProductId: documentSnapshot.data() });
      } else {
        res.status(404).send({ success: false, message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error get SaleProduct document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from SaleProduct",
      });
    }
  };
  
  module.exports = {
    getAllSaleProducts,
    addSaleProduct,
    updateSaleProduct,
    deleteSaleProduct,
    getSaleProductById,
  };
  