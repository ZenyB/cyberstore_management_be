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
  
  const getAllRepairOrder = async (req, res) => {
    const myCollection = collection(firestore, "RepairOrder");
    try {
      const querySnapshot = await getDocs(myCollection);
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
      const newList = list.sort((a, b) => a.repairOrderId.localeCompare(b.repairOrderId));
      res.json({ success: true, RepairOrders: newList });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from sale product",
      });
      console.log(error);
      return [];
    }
  };
  
  const addRepairOrder = async (req, res) => {
    try {
      const myCollection = collection(firestore, "RepairOrder");
      const docRef = await addDoc(myCollection, req.body);
      console.log("Document RepairOrder successfully add!");
      res.send({
        success: true,
        message: "RepairOrder added successfully",
        docId: docRef.id,
      });
    } catch (error) {
      console.error("Error adding document RepairOrder: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when adding RepairOrder",
      });
    }
  };
  
  const updateRepairOrder = async (req, res) => {
    try {
      const myCollection = collection(firestore, "RepairOrder");
      const docRef1 = doc(myCollection, req.params.RepairOrderId);
      let data = req.body;
      await updateDoc(docRef1, data);
      console.log("Document RepairOrder successfully updated!");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.error("Error updating RepairOrder document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when update document",
      });
    }
  };
  
  const deleteRepairOrder = async (req, res) => {
    try {
      const documentRef = doc(firestore, "RepairOrder", req.params.RepairOrderId);
      await deleteDoc(documentRef);
      console.log("Document RepairOrder deleted successfully.");
      res.send({ success: true, message: "Document successfully updated!" });
    } catch (error) {
      console.log("Error deleting RepairOrder document:", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when delete document",
      });
    }
  };
  
  const getRepairOrderById = async (req, res) => {
    try {
      const myCollection = collection(firestore, "RepairOrder");
      const docRef1 = doc(myCollection, req.params.Id);
      const documentSnapshot = await getDoc(docRef1);
      console.log(documentSnapshot.data());
      if (documentSnapshot.exists()) {
        res.send({ success: true, repairOrderById: documentSnapshot.data() });
      } else {
        res.status(404).send({ success: false, message: "RepairOrder not found" });
      }
    } catch (error) {
      console.error("Error get RepairOrder document: ", error);
      res.status(500).json({
        success: false,
        message: "something went wrong when get data from RepairOrder",
      });
    }
  };
  
  // const getStaffsBySearch = async (req, res) => {
  //   const { maNhanVien, maBenhNhan, tenBenhNhan, ngayLap, tinhTrang } = req.query;
  //   const myCollection = collection(firestore, "HoaDon");
  //   try {
  //     const querySnapshot = await getDocs(myCollection);
  //     const list = querySnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       const docId = doc.id;
  //       return { ...data, Id: docId };
  //     });
  //     const searchResults = list.filter((hoadon) => {
  //       const normalizeText = (text) => text.toLowerCase();
  //       console.log("abc");
  //       const matchMaHoaDon =
  //         maHoaDon === "" ||
  //         normalizeText(hoadon.maHoaDon).includes(normalizeText(maHoaDon));
  //       const matchMaBenhNhan =
  //         maBenhNhan === "" ||
  //         normalizeText(hoadon.maBenhNhan).includes(normalizeText(maBenhNhan));
  //       const matchTenBenhNhan =
  //         tenBenhNhan === "" ||
  //         normalizeText(hoadon.tenBenhNhan).includes(normalizeText(tenBenhNhan));
  
  //       const matchNgayLap =
  //         ngayLap === "" || compareDates(ngayLap, hoadon.ngayLap) == 0;
  
  //       const matchTinhTrang = tinhTrang == "" || tinhTrang == hoadon.tinhTrang;
  //       return (
  //         matchMaBenhNhan &&
  //         matchMaHoaDon &&
  //         matchTenBenhNhan &&
  //         matchNgayLap &&
  //         matchTinhTrang
  //       );
  //     });
  //     const sortList = searchResults.sort((a, b) =>
  //       a.maHoaDon.localeCompare(b.maHoaDon)
  //     );
  //     res.json({ success: true, bills: sortList });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "something went wrong when get data from HoaDon",
  //     });
  //     console.log(error);
  //     return [];
  //   }
  // };
  
  module.exports = {
    getAllRepairOrder,
    addRepairOrder,
    updateRepairOrder,
    deleteRepairOrder,
    getRepairOrderById,
  };
  