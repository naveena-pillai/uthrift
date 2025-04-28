// When item is clicked, will have to display an overlay of its info with a checkout button
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useItemContext } from "../context/ItemContext";
import Item from "../components/Item";
import ItemCard from "../components/ItemCard";
import CategoryBar from "../components/CategoryBar";

interface ItemCardProps {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  seller: string;
  description: string;
  material: string;
  condition: string;
}

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
            id: doc.id,
            name: data.name,
            thumbnail: data.imageUrl,
            price: data.price,
            seller: data.sellerId,
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
    <>
      <Navbar />
      <CategoryBar />
      <div className="bg-[#F8F4EC] min-h-screen flex justify-center py-10">
        <div className="grid grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} onClick={() => handleItemClick(item)}>
              <Item
                id={item.id}
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
    </>
  );
};

export default HomePage;
