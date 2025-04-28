import { useItemContext } from "../context/ItemContext";
import { addItemToCart } from "../firebase/firebaseFunctions";

interface ItemProps {
    name: string;
    thumbnail: string;
    price: number;
    seller: string;
    description: string;
    material: string;
    condition: string;
}

const Item: React.FC<ItemProps> = ({ name, thumbnail, price, seller, description, material, condition }) => {
    const { setSelectedItem } = useItemContext();

    const handleItemClick = () => {
        setSelectedItem({ name, thumbnail, price, seller, description, material, condition });
    };

    const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const item = { name, thumbnail, price, seller, description, material, condition };
        addItemToCart(item);
    };

    return (
        <div className="p-[5px] flex-col" onClick={handleItemClick}>
            <img src={thumbnail} className="w-[300px] h-[300px] object-cover" />
            <h1 className="font-[Inter] font-[18px]">{name}</h1>
            <div className="flex flex-row justify-between">
                <h1 className="font-[Inter] font-[16px]">${price}</h1>
                <button 
                  className="font-[Inter] font-[15px] p-[5px] text-center rounded-lg bg-[#7E9181] cursor-pointer text-white" 
                  onClick={addToCart}>
                  Add to Cart!
                </button>
            </div>
        </div>
    );
};

export default Item;