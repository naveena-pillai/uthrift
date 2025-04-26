import { useItemContext } from "../Context/ItemContext";

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
        // Later: Add to Firebase
    };

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setSelectedItem(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50" onClick={handleBackgroundClick}>
            <div className="p-[40px] w-[536px] h-[962px] bg-[#E8E2D5] gap-8 flex flex-col overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center">
                    <h1 className="font-[Roboto] font-[26px]">{selectedItem.name}</h1>
                    <img src={selectedItem.thumbnail} className="w-[350px] h-[350px] object-cover" />
                    <p className="font-[Montserrat] font-[20px]">{"Seller " + selectedItem.seller}</p>
                </div>
                <div className="flex gap-4">
                    <h2 className="font-[Inter] font-[20px]">Description:</h2>
                    <p className="font-[Montserrat] font-[20px]">{selectedItem.description}</p>
                </div>
                <div className="flex gap-4">
                    <h2 className="font-[Inter] font-[20px]">Material:</h2>
                    <p className="font-[Montserrat] font-[20px]">{selectedItem.material}</p>
                </div>
                <div className="flex gap-4">
                    <h2 className="font-[Inter] font-[20px]">Condition:</h2>
                    <p className="font-[Montserrat] font-[20px]">{selectedItem.condition}</p>
                </div>
                <div className="bottom flex justify-between">
                    <h1 className="font-[Roboto] font-[26px]">Price: ${selectedItem.price}</h1>
                    <button 
                      className="font-[Inter] font-[20px] p-[10px] text-center rounded-lg" 
                      onClick={addToCart}>
                      Add to Cart!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;