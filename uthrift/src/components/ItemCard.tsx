// Overlay that should appear when an item is pressed, should display item thumbnail, name, price, seller, etc
interface ItemCardProps {
    name: string;
    thumbnail: string;
    seller: string;
    description: string;
    material: string;
    condition: string;
    price: number;
}

//const ItemCard: React.FC = (props: ItemCardProps) => { why does this not work??
const ItemCard: React.FC<ItemCardProps> = ({ name, thumbnail, seller, description, material, condition, price }) => {
    const addToCart = () => {
        //insert here to add to card
    }
    return (
        <div className="p-[40px] w-[536px] h-[962px] bg-[#E8E2D5] gap-8">
            <div>
                <div className ="flex flex-col items-center">
                    <h1 className ="font-[Roboto] font-[26px]">{name}</h1>
                    <img src={thumbnail} className = "w-[350px] h-[350px] object-cover"/>
                    <p className="font-[Montserrat] font-[20px]">{"Seller " + seller}</p>
                </div>
            </div>
            <div className="flex gap-4">
                <h2 className="font-[Inter] font-[20px]">Description: </h2>
                <p className="font-[Montserrat] font-[20px]">{description}</p>
            </div>
            <div className="flex gap-4">
                <h2 className="font-[Inter] font-[20px]">Material: </h2>
                <p className="font-[Montserrat] font-[20px]">{material}</p>
            </div>
            <div className="flex gap-4">
                <h2 className="font-[Inter] font-[20px]">Condition: </h2>
                <p className="font-[Montserrat] font-[20px]">{condition}</p>
            </div>
            <div className="bottom flex justify-between">
                <h1 className ="font-[Roboto] font-[26px]">Price: ${price}</h1>
                <button className="font-[Inter] font-[20px] p-[10px] text-align rounded-lg" onClick={addToCart}>Add to Cart!</button>
            </div>
        </div>
    );
}

export default ItemCard;