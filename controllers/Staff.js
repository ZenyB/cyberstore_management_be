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

const getAllStaffs = async (req, res) => {
  const myCollection = collection(firestore, "Staff");
  try {
    const querySnapshot = await getDocs(myCollection);
    const list = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const docId = doc.id;
      return { ...data, Id: docId };
    });
    const newList = list.sort((a, b) => a.staffId.localeCompare(b.staffId));
    res.json({ success: true, staffs: newList });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong when get data from Staff",
    });
    console.log(error);
    return [];
  }
};

const addStaff = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Staff");
    const docRef = await addDoc(myCollection, req.body);
    console.log("Document staff successfully add!");
    res.send({
      success: true,
      message: "Staff added successfully",
      docId: docRef.id,
    });
  } catch (error) {
    console.error("Error adding document staff: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when adding staff",
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Staff");
    const docRef1 = doc(myCollection, req.params.staffId);
    let data = req.body;
    await updateDoc(docRef1, data);
    console.log("Document staff successfully updated!");
    res.send({ success: true, message: "Document successfully updated!" });
  } catch (error) {
    console.error("Error updating staff document: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when update document",
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const documentRef = doc(firestore, "Staff", req.params.staffId);
    await deleteDoc(documentRef);
    console.log("Document staff deleted successfully.");
    res.send({ success: true, message: "Document successfully updated!" });
  } catch (error) {
    console.log("Error deleting staff document:", error);
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

const getStaffById = async (req, res) => {
  try {
    const myCollection = collection(firestore, "Staff");
    const docRef1 = doc(myCollection, req.params.Id);
    const documentSnapshot = await getDoc(docRef1);

    if (documentSnapshot.exists()) {
      res.send({ success: true, staffById: documentSnapshot.data() });
    } else {
      res.status(404).send({ success: false, message: "Staff not found" });
    }
  } catch (error) {
    console.error("Error get user document: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong when get data from staff",
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
  getAllStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffById,
};
