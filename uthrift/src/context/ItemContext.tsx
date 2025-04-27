import { createContext, useContext, useState, ReactNode } from "react";

interface ItemData {
  name: string;
  thumbnail: string;
  seller: string;
  description: string;
  material: string;
  condition: string;
  price: number;
}

interface ItemContextType {
  selectedItem: ItemData | null;
  setSelectedItem: (item: ItemData | null) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used inside an ItemProvider");
  }
  return context;
};
