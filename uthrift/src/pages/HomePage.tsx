// Shows most popular items
// When item is clicked, will have to display an overlay of its info with a checkout button, create component maybe
import { useItemContext } from "../Context/ItemContext";
import Item from "../components/Item";
import ItemCard from "../components/ItemCard";
import type { ItemCardProps } from "../components/ItemCard"; 

const items: ItemCardProps[] = [
    //example input
    {
        name: "Item 1",
        thumbnail: "https://example.com/thumbnail1.jpg",
        price: 25,
        seller: "Seller 1",
        description: "This is a description for Item 1.",
        material: "Material 1",
        condition: "New"
    }
];

const HomePage = () => {
  const { selectedItem, setSelectedItem } = useItemContext();
  return (
    <div className="bg-[#F8F4EC] h-screen">
      <div className="grid grid-cols-3 gap-6">
        {items.map((item: ItemCardProps, index) => (
          <Item
          key={index}
          name={item.name}
          thumbnail={item.thumbnail}
          price={item.price}
          seller={item.seller}       
          description={item.description}  
          material={item.material}     
          condition={item.condition}
        />
        ))}
      </div>
      {selectedItem && <ItemCard />}
    </div>
  );
}

export default HomePage;