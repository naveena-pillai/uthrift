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
  const { selectedItem, setSelectedItem } = useItemContext();
  const { currentUser, userData } = useAuth();

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

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (!selectedItem) return;

    try {
      await addItemToCart(currentUser.uid, selectedItem.id);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };
  return (
    <div
      className="w-[320px] h-[450px] p-4 bg-[#E8E2D5] rounded-2xl border border-transparent hover:border-[#7E2C1E] hover:shadow-lg transition-all flex flex-col cursor-pointer"
      onClick={handleItemClick}
    >
      <img
        src={thumbnail}
        alt={name}
        className="w-full h-[250px] object-cover rounded-xl"
      />

      <h1 className="font-inter text-xl font-semibold mt-4 text-center">
        {name}
      </h1>

      <div className="flex justify-between items-center mt-auto">
        <h2 className="font-inter text-lg font-medium text-[#7E2C1E]">
          ${price}
        </h2>
        {userData?.role !== "seller" && (
          <button
            onClick={handleAddToCart}
            className="cursor-pointer font-inter text-lg px-4 py-2 rounded-xl text-white bg-[#7E9181] hover:bg-[#6b7e6e] transition-colors shadow"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
