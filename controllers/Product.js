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
  
  const getAllProducts = async (req, res) => {
    const myCollection = collection(firestore, "Product");
    try {
      const querySnapshot = await getDocs(myCollection);
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
      const newList = list.sort((a, b) => a.productId.localeCompare(b.productId));
      res.json({ success: true, Products: newList });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from sale product",
      });
      console.log(error);
      return [];
    }
  };
  
  const addProduct = async (req, res) => {
    try {
      const myCollection = collection(firestore, "Product");
      const docRef = await addDoc(myCollection, req.body);
      console.log("Document Product successfully add!");
      res.send({
        success: true,
        message: "Product added successfully",
        docId: docRef.id,
      });
    } catch (error) {
      console.error("Error adding document Product: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when adding Product",
      });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const myCollection = collection(firestore, "Product");
      const docRef1 = doc(myCollection, req.params.ProductId);
      let data = req.body;
      await updateDoc(docRef1, data);
      console.log("Document Product successfully updated!");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.error("Error updating Product document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when update document",
      });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const documentRef = doc(firestore, "Product", req.params.ProductId);
      await deleteDoc(documentRef);
      console.log("Document Product deleted successfully.");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.log("Error deleting Product document:", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when delete document",
      });
    }
  };
  
  const getProductById = async (req, res) => {
    try {
        console.log("hi");
      const myCollection = collection(firestore, "Product");
      const docRef1 = doc(myCollection, req.params.Id);
      const documentSnapshot = await getDoc(docRef1);
  
      if (documentSnapshot.exists()) {
        res.send({ success: true, productById: documentSnapshot.data() });
      } else {
        res.status(404).send({ success: false, message: "Staff not found" });
      }
    } catch (error) {
      console.error("Error get Product document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from Product",
      });
    }
  };
  
  module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
  