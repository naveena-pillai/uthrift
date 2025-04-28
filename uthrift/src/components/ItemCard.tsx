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
      setSelectedItem(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div
        className="p-8 w-[540px] max-h-[85%] bg-[#E8E2D5] rounded-3xl shadow-xl overflow-y-auto flex flex-col gap-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="font-[Montserrat] text-3xl text-[#7E2C1E] font-bold mb-4">
            {selectedItem.name}
          </h1>
          <img
            src={selectedItem.thumbnail}
            alt={selectedItem.name}
            className="w-[350px] h-[350px] object-cover rounded-2xl shadow-md"
          />
          <p className="font-montserrat text-lg mt-3">
            Seller:{" "}
            <span className="font-semibold">{sellerName || "Loading..."}</span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <h2 className="font-inter text-lg font-semibold">Description:</h2>
            <p className="font-montserrat text-lg">
              {selectedItem.description}
            </p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-inter text-lg font-semibold">Material:</h2>
            <p className="font-montserrat text-lg">{selectedItem.material}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-inter text-lg font-semibold">Condition:</h2>
            <p className="font-montserrat text-lg">{selectedItem.condition}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h1 className="font-roboto text-2xl font-bold text-[#7E2C1E]">
            Price: ${selectedItem.price}
          </h1>
          {userData?.role !== "seller" && (
            <button
              onClick={handleAddToCart}
              className="font-inter text-lg px-4 py-2 rounded-xl text-white bg-[#7E9181] hover:bg-[#6b7e6e] transition-colors shadow"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
