import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

const ordersCollection = collection(db, "orders");

// Real-time listener — sabse naya order sabse upar dikhega
export function subscribeToOrders(callback) {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(orders);
  });
}

export async function placeOrder(orderData) {
  return addDoc(ordersCollection, {
    ...orderData,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

export async function updateOrderStatus(id, newStatus) {
  const orderDoc = doc(db, "orders", id);
  return updateDoc(orderDoc, { status: newStatus });
}