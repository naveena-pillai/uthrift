// Shows most popular items
// When item is clicked, will have to display an overlay of its info with a checkout button, create component maybe
import { useItemContext } from "../Context/ItemContext";
import { useState } from "react";
import Item from "../components/Item";
import ItemCard from "../components/ItemCard";
import type { ItemCardProps } from "../components/ItemCard"; 
<Item key={index} name={item.name} thumbnail={item.thumbnail} price={item.price} onClick={() => setSelectedItem(item)} />

const items: ItemCardProps[] = [
//add here??
];

const HomePage = () => {
  const { setSelectedItem } = useItemContext();

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item: ItemCardProps, index) => (
          <Item
            key={index}
            name={item.name}
            thumbnail={item.thumbnail}
            price={item.price}
            onClick={() => setSelectedItem(item)} // <--- set context when clicked
          />
        ))}
      </div>

      <ItemCard /> 
    </>
  );
}

export default HomePage;


//add later???
    /*const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }*/