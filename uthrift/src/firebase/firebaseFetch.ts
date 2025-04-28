import { db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { UserData } from "../types/UserData";
import { Item } from "../types/Item";
import { deleteDoc } from "firebase/firestore";

export const fetchUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.warn("No user document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchItemData = async (
  itemId: string
): Promise<(Item & { id: string }) | null> => {
  try {
    const itemDoc = await getDoc(doc(db, "items", itemId));
    if (itemDoc.exists()) {
      const data = itemDoc.data() as Item;
      return { ...data, id: itemDoc.id }; // Attach Firestore doc ID
    } else {
      console.warn("No item document found for Item ID:", itemId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching item data:", error);
    return null;
  }
};

export const removeItemFromCart = async (uid: string, itemId: string) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      orders: arrayRemove(itemId),
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const addItemToCart = async (
  uid: string,
  itemId: string
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      orders: arrayUnion(itemId),
    });
    console.log(`Item ${itemId} added to cart for user ${uid}.`);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const deleteItemFromItems = async (itemId: string): Promise<void> => {
  try {
    const itemRef = doc(db, "items", itemId);
    await deleteDoc(itemRef);
    console.log(`Item ${itemId} deleted from items collection.`);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

export const clearCart = async (id: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      orders: [],
    });
    console.log("Cart cleared.");
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
