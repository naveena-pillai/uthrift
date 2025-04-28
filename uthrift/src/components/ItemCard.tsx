import { useItemContext } from "../context/ItemContext";
import { addItemToCart } from "../firebase/firebaseFunctions";

export type ItemCardProps = {
    name: string;
    thumbnail: string;
    seller: string;
    description: string;
    material: string;
    condition: string;
    price: number;
};

const ItemCard: React.FC = () => {
    const { selectedItem, setSelectedItem } = useItemContext();

    if (!selectedItem) return null;

    const addToCart = () => {
        addItemToCart(selectedItem);
    };

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setSelectedItem(null);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
            onClick={handleBackgroundClick}
        >
            <div
                className="p-[40px] w-[536px] h-[962px] bg-[#E8E2D5] gap-8 flex flex-col overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center">
                    <h1 className="font-[Roboto] text-[26px]">{selectedItem.name}</h1>
                    <img
                        src={selectedItem.thumbnail}
                        className="w-[350px] h-[350px] object-cover"
                        alt={selectedItem.name}
                    />
                    <p className="font-[Montserrat] text-[20px]">{"Seller: " + selectedItem.seller}</p>
                </div>

                <div className="flex gap-4">
                    <h2 className="font-[Inter] text-[20px]">Description:</h2>
                    <p className="font-[Montserrat] text-[20px]">{selectedItem.description}</p>
                </div>

                <div className="flex gap-4">
                    <h2 className="font-[Inter] text-[20px]">Material:</h2>
                    <p className="font-[Montserrat] text-[20px]">{selectedItem.material}</p>
                </div>

                <div className="flex gap-4">
                    <h2 className="font-[Inter] text-[20px]">Condition:</h2>
                    <p className="font-[Montserrat] text-[20px]">{selectedItem.condition}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <h1 className="font-[Roboto] text-[26px]">Price: ${selectedItem.price}</h1>
                    <button
                        className="font-[Inter] text-[20px] p-[10px] text-center rounded-lg text-white bg-[#7E9181] cursor-pointer"
                        onClick={addToCart}
                    >
                        Add to Cart!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;