import { db } from "./firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { UserData } from "../types/UserData";
import { Item } from "../types/Item";

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

export const fetchItemData = async (itemId: string): Promise<Item | null> => {
  try {
    const itemDoc = await getDoc(doc(db, "items", itemId));
    if (itemDoc.exists()) {
      return itemDoc.data() as Item;
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