import { useItemContext } from "../context/ItemContext";
import { useAuth } from "../context/AuthContext";
import { addItemToCart } from "../firebase/firebaseFetch";

interface ItemProps {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  seller: string;
  description: string;
  material: string;
  condition: string;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  thumbnail,
  price,
  seller,
  description,
  material,
  condition,
}) => {
  const { setSelectedItem } = useItemContext();
  const { currentUser, userData } = useAuth(); // Grab userData here

  const handleItemClick = () => {
    setSelectedItem({
      id,
      name,
      thumbnail,
      price,
      seller,
      description,
      material,
      condition,
    });
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent opening the item modal

    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await addItemToCart(currentUser.uid, id); // Pass user ID and item ID
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="p-2 flex flex-col cursor-pointer" onClick={handleItemClick}>
      <img
        src={thumbnail}
        alt={name}
        className="w-[300px] h-[300px] object-cover"
      />
      <h1 className="font-inter text-lg mt-2">{name}</h1>
      <div className="flex justify-between items-center mt-1">
        <h2 className="font-inter text-base">${price}</h2>
        {userData &&
          userData.role !== "seller" && ( // Guard against null
            <button
              onClick={handleAddToCart}
              className="font-inter text-sm px-3 py-1 rounded-lg bg-[#7E9181] text-white hover:bg-[#6b7e6e]"
            >
              Add to Cart!
            </button>
          )}
      </div>
    </div>
  );
};

export default Item;
