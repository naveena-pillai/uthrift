import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

interface UploadItemProps {
  onClose: () => void;
  onUploadComplete: () => void;
}

// Define subcategories for the dropdown
const categories = [
  "Shirts",
  "Pants",
  "Jackets",
  "Shoes",
  "Backpacks",
  "Notebooks",
  "Pens",
  "Calculators",
  "Laptops",
  "Phones",
  "Chargers",
];

const UploadItem: React.FC<UploadItemProps> = ({
  onClose,
  onUploadComplete,
}) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    material: "",
    condition: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  // Handles form field changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to upload items");
      return;
    }

    try {
      // Create the item document
      const itemsRef = collection(db, "items");
      const itemData = {
        name: formData.name,
        description: formData.description,
        material: formData.material,
        condition: formData.condition,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl,
        sellerId: currentUser.uid,
        popularCount: 0,
        createdAt: new Date().toISOString(),
      };

      // Add to Firebase
      const docRef = await addDoc(itemsRef, itemData);

      if (docRef.id) {
        console.log("Item added successfully:", docRef.id);
        // Reset form
        setFormData({
          name: "",
          description: "",
          material: "",
          condition: "",
          price: "",
          category: "",
          imageUrl: "",
        });
        // Update parent component and close
        await onUploadComplete();
        onClose();
      }
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Failed to upload item. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#E8E2D5] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          />

          {/* Category dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          />
          <input
            type="text"
            name="material"
            placeholder="Material"
            value={formData.material}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
            min="0"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 rounded border"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7E9181] text-black hover:bg-[#6b7c6f] hover:text-white rounded"
            >
              Upload Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadItem;
