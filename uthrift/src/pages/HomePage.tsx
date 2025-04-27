// Shows most popular items
// When item is clicked, will have to display an overlay of its info with a checkout button, create component maybe
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import { useItemContext } from "../context/ItemContext";
import Item from "../components/Item";
import ItemCard from "../components/ItemCard";
import type { ItemCardProps } from "../components/ItemCard";

const HomePage = () => {
  const { selectedItem, setSelectedItem } = useItemContext();
  const [items, setItems] = useState<ItemCardProps[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items")); 
        const itemsList: ItemCardProps[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          itemsList.push({
            name: data.name,
            thumbnail: data.thumbnail,
            price: data.price,
            seller: data.seller,
            description: data.description,
            material: data.material,
            condition: data.condition,
          });
        });
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching items from Firestore:", error);
      }
    };

    fetchItems(); 
  }, []);

  const handleItemClick = (item: ItemCardProps) => {
    setSelectedItem(item);
  };

  return (
    <div className="bg-[#F8F4EC] h-screen flex justify-center">
      <div className="grid grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item)}>
            <Item
              name={item.name}
              thumbnail={item.thumbnail}
              price={item.price}
              seller={item.seller}
              description={item.description}
              material={item.material}
              condition={item.condition}
            />
          </div>
        ))}
      </div>
      {selectedItem && <ItemCard />}
    </div>
  );
};

export default HomePage;
