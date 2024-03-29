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

const getAllDiscount = async (req, res) => {
  const myCollection = collection(firestore, "Discount");
  try {
    const querySnapshot = await getDocs(myCollection);
    const list = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const docId = doc.id;
      return { ...data, Id: docId };
    });
    const newList = list.sort((a, b) =>
      a.discountId.localeCompare(b.discountId)
    );
    res.json({ success: true, discounts: newList });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong when get data from Discount",
    });
    console.log(error);
    return [];
  }
};

const addDiscount = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Discount");
    const docRef = await addDoc(myCollection, req.body);
    console.log("Document discount successfully add!");
    res.send({
      success: true,
      message: "Discount added successfully",
      docId: docRef.id,
    });
  } catch (error) {
    console.error("Error adding document discount: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when adding discount",
    });
  }
};

const updateDiscount = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Discount");
    const docRef1 = doc(myCollection, req.params.discountId);
    let data = req.body;
    await updateDoc(docRef1, data);
    console.log("Document discount successfully updated!");
    res.send({ success: true, message: "Document successfully updated!" });
  } catch (error) {
    console.error("Error updating discount document: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when update document",
    });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const documentRef = doc(firestore, "Discount", req.params.discountId);
    await deleteDoc(documentRef);
    console.log("Document discount deleted successfully.");
    res.send({ success: true, message: "Document successfully updated!" });
  } catch (error) {
    console.log("Error deleting discount document:", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when delete document",
    });
  }
};

function compareDates(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  if (date1 < date2) {
    return -1; // dateString1 là ngày trước dateString2
  } else if (date1 > date2) {
    return 1; // dateString1 là ngày sau dateString2
  } else {
    return 0; // Hai ngày bằng nhau
  }
}

const getDiscountById = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Discount");
    const docRef1 = doc(myCollection, req.params.Id);
    const documentSnapshot = await getDoc(docRef1);

    if (documentSnapshot.exists()) {
      res.send({ success: true, discountById: documentSnapshot.data() });
    } else {
      res.status(404).send({ success: false, message: "Discount not found" });
    }
  } catch (error) {
    console.error("Error get discount document: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when get data from discount",
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
  getAllDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
};
