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
  
  const getAllWarrantyCertificates = async (req, res) => {
    const myCollection = collection(firestore, "WarrantyCertificate");
    try {
      const querySnapshot = await getDocs(myCollection);
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
      const newList = list.sort((a, b) => a.warrantyCertificateId.localeCompare(b.warrantyCertificateId));
      res.json({ success: true,WarrantyCertificates: newList });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from sale product",
      });
      console.log(error);
      return [];
    }
  };
  
  const addWarrantyCertificate = async (req, res) => {
    try {
      const myCollection = collection(firestore, "WarrantyCertificate");
      const docRef = await addDoc(myCollection, req.body);
      console.log("Document WarrantyCertificate successfully add!");
      res.send({
        success: true,
        message: "WarrantyCertificate added successfully",
        docId: docRef.id,
      });
    } catch (error) {
      console.error("Error adding document WarrantyCertificate: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when adding WarrantyCertificate",
      });
    }
  };
  
  const updateWarrantyCertificate = async (req, res) => {
    try {
      const myCollection = collection(firestore, "WarrantyCertificate");
      const docRef1 = doc(myCollection, req.params.warrantyCertificateId);
      let data = req.body;
      await updateDoc(docRef1, data);
      console.log("Document WarrantyCertificate successfully updated!");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.error("Error updating WarrantyCertificate document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when update document",
      });
    }
  };
  
  const deleteWarrantyCertificate = async (req, res) => {
    try {
      const documentRef = doc(firestore, "WarrantyCertificate", req.params.warrantyCertificateId);
      await deleteDoc(documentRef);
      console.log("Document WarrantyCertificate deleted successfully.");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.log("Error deleting WarrantyCertificate document:", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when delete document",
      });
    }
  };
  
  const getWarrantyCertificateById = async (req, res) => {
    try {
      const myCollection = collection(firestore, "WarrantyCertificate");
      const docRef1 = doc(myCollection, req.params.Id);
      const documentSnapshot = await getDoc(docRef1);
  
      if (documentSnapshot.exists()) {
        res.send({ success: true, warrantyCertificateId: documentSnapshot.data() });
      } else {
        res.status(404).send({ success: false, message: "WarrantyCertificate not found" });
      }
    } catch (error) {
      console.error("Error get WarrantyCertificate document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from WarrantyCertificate",
      });
    }
  };
  
  module.exports = {
    getAllWarrantyCertificates,
    addWarrantyCertificate,
    updateWarrantyCertificate,
    deleteWarrantyCertificate,
    getWarrantyCertificateById,
  };
  