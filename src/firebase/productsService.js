import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

// Real-time listener — jab bhi Firestore mein products change hon, ye khud update ho jata hai
export function subscribeToProducts(callback) {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(products);
  });
}

export async function addProduct(product) {
  return addDoc(productsCollection, product);
}

export async function updateProduct(id, updatedData) {
  const productDoc = doc(db, "products", id);
  return updateDoc(productDoc, updatedData);
}

export async function deleteProduct(id) {
  const productDoc = doc(db, "products", id);
  return deleteDoc(productDoc);
}

export async function getProductById(id) {
  const productDoc = doc(db, "products", id);
  const snapshot = await getDoc(productDoc);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}