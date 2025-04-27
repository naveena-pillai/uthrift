import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "./firebase"; 

export const addItemToCart = async (item: any) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        orders: arrayUnion(item) 
      });

      console.log("Item added to cart!");
    } else {
      console.log("User not authenticated");
    }
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};