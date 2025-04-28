import { useAuth } from "../context/AuthContext";
import { useItemContext } from "../context/ItemContext";
import { useEffect, useState } from "react";
import { addItemToCart, fetchUserData } from "../firebase/firebaseFetch";

const ItemCard: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const { selectedItem, setSelectedItem } = useItemContext();
  const [sellerName, setSellerName] = useState<string>("");

  // Fetch seller's name
  useEffect(() => {
    const loadSeller = async () => {
      if (selectedItem?.seller) {
        const sellerData = await fetchUserData(selectedItem.seller);
        if (sellerData) {
          setSellerName(`${sellerData.firstName} ${sellerData.lastName}`);
        }
      }
    };
    loadSeller();
  }, [selectedItem]);

  if (!selectedItem) return null;

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await addItemToCart(currentUser.uid, selectedItem.id);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedItem(null); // Close modal
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <div
        className="p-10 w-[536px] h-[80%] bg-[#E8E2D5] gap-8 flex flex-col overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <h1 className="font-roboto text-2xl">{selectedItem.name}</h1>
          <img
            src={selectedItem.thumbnail}
            alt={selectedItem.name}
            className="w-[350px] h-[350px] object-cover"
          />
          <p className="font-montserrat text-lg">
            Seller: {sellerName || "Loading..."}
          </p>
        </div>

        <div className="flex gap-4">
          <h2 className="font-inter text-lg">Description:</h2>
          <p className="font-montserrat text-lg">{selectedItem.description}</p>
        </div>

        <div className="flex gap-4">
          <h2 className="font-inter text-lg">Material:</h2>
          <p className="font-montserrat text-lg">{selectedItem.material}</p>
        </div>

        <div className="flex gap-4">
          <h2 className="font-inter text-lg">Condition:</h2>
          <p className="font-montserrat text-lg">{selectedItem.condition}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h1 className="font-roboto text-2xl">Price: ${selectedItem.price}</h1>
          {userData?.role !== "seller" && (
            <button
              onClick={handleAddToCart}
              className="font-inter text-lg p-2 rounded-lg text-white bg-[#7E9181] hover:bg-[#6b7e6e]"
            >
              Add to Cart!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
