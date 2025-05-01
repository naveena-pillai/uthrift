import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    name: "Clothes",
    subcategories: ["Shirts", "Pants", "Jackets", "Shoes"],
  },
  {
    name: "School",
    subcategories: ["Backpacks", "Notebooks", "Pens", "Calculators"],
  },
  {
    name: "Electronics",
    subcategories: ["Laptops", "Phones", "Chargers"],
  },
];

const CategoryBar: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  const handleNavigate = (name: string) => {
    navigate(`/category/${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex space-x-6 bg-[#E8E2D5] p-4 rounded-lg shadow-lg">
      {categories.map((category) => (
        <div key={category.name} className="relative">
          <button
            className="cursor-pointer font-inter text-lg font-semibold"
            onClick={() => toggleCategory(category.name)}
          >
            {category.name}
          </button>
          {expandedCategory === category.name && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2">
              {category.subcategories.map((sub) => (
                <p
                  key={sub}
                  className="text-base font-montserrat text-gray-700 hover:underline cursor-pointer whitespace-nowrap"
                  onClick={() => handleNavigate(sub)}
                >
                  {sub}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
