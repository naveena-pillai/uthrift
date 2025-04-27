import { useItemContext } from "../Context/ItemContext";

interface ItemProps {
    name: string;
    thumbnail: string;
    price: number;
    seller: string;
    description: string;
    material: string;
    condition: string;
    onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ name, thumbnail, price, seller, description, material, condition, onClick }) => {
    const { setSelectedItem } = useItemContext();

    const handleItemClick = () => {
        setSelectedItem({ name, thumbnail, price, seller, description, material, condition });
        onClick();
    };

    const addToCart = () => {
        // Later: Add to cart logic
    };

    return (
        <div className="p-[5px] flex-col" onClick={handleItemClick}>
            <img src={thumbnail} className="w-[350px] h-[350px] object-cover" />
            <h1 className="font-[Inter] font-[18px]">{name}</h1>
            <div className="flex-row justify-between">
                <h1 className="font-[Inter] font-[16px]">${price}</h1>
                <button 
                  className="font-[Inter] font-[15px] p-[5px] text-center rounded-lg" 
                  onClick={(e) => {
                      e.stopPropagation();
                      addToCart();
                  }}>
                  Add to Cart!
                </button>
            </div>
        </div>
    );
};

export default Item;