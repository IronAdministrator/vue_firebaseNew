import { ref, watchEffect } from "vue";

import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const getCollection = (c, q) => {
  const documents = ref(null);

  // collection reference
  let colRef = collection(db, c);

  if (q) {
    colRef = query(colRef, where(...q));
  }

  // storing function in a varible to be able to unsubscribe
  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    // update values
    documents.value = results;
  });

  // unsubscribe from database
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
