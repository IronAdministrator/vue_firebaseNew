import { ref, watchEffect } from "vue";

import { db } from "@/firebase/config";
import {
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collection,
} from "firebase/firestore";

const useDocument = (col) => {
  const error = ref(null);
  const isPending = ref(null);
  let colRef = collection(db, col);

  const addDocument = async (doc) => {
    isPending.value = true;
    error.value = null;
    try {
      const response = await addDoc(colRef, doc);
      isPending.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not send the message";
    }
  };

  const deleteDocument = async (id) => {
    isPending.value = true;
    error.value = null;
    const docRef = doc(db, col, id);
    try {
      const response = await deleteDoc(docRef);
      isPending.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "Could not delete the Document";
    }
  };

  const toggleFav = async (book) => {
    isPending.value = true;
    error.value = null;
    const docRef = doc(db, col, book.id);
    updateDoc(docRef, {
      isFav: !book.isFav,
    });
    isPending.value = false;

    // try {
    //   const response = await deleteDoc(docRef);
    //   isPending.value = false;
    //   return response;
    // } catch (err) {
    //   console.log(err.message);
    //   isPending.value = false;
    //   error.value = "Could not delete the Document";
    // }
  };

  return { addDocument, deleteDocument, toggleFav, error, isPending };
};
export default useDocument;
