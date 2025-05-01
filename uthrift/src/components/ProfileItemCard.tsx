import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProfileItemCardProps {
  id: string;
  name: string;
  thumbnail: string;
  seller: string;
  description: string;
  material: string;
  condition: string;
  price: number;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any, newImage?: File) => void;
}

const ProfileItemCard: React.FC<ProfileItemCardProps> = ({
  id,
  name,
  thumbnail,
  description,
  material,
  condition,
  price,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name,
    description,
    material,
    condition,
    price,
    imageUrl: thumbnail,
  });
  const [error, setError] = useState("");

  const validateFields = () => {
    if (!editedData.name.trim()) return "Name is required";
    if (!editedData.description.trim()) return "Description is required";
    if (!editedData.material.trim()) return "Material is required";
    if (!editedData.condition.trim()) return "Condition is required";
    if (!editedData.price || editedData.price <= 0)
      return "Valid price is required";
    if (!editedData.imageUrl.trim()) return "Image URL is required";
    return "";
  };

  const handleSave = () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onUpdate(id, editedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Image URL input section */}
        <div className="relative mb-4">
          <img
            src={editedData.imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            value={editedData.imageUrl}
            onChange={(e) =>
              setEditedData({ ...editedData, imageUrl: e.target.value })
            }
            placeholder="Image URL (required)"
          />
        </div>

        <input
          className="w-full mb-2 p-2 border rounded"
          value={editedData.name}
          onChange={(e) =>
            setEditedData({ ...editedData, name: e.target.value })
          }
          placeholder="Name (required)"
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          value={editedData.description}
          onChange={(e) =>
            setEditedData({ ...editedData, description: e.target.value })
          }
          placeholder="Description (required)"
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          value={editedData.material}
          onChange={(e) =>
            setEditedData({ ...editedData, material: e.target.value })
          }
          placeholder="Material (required)"
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          value={editedData.condition}
          onChange={(e) =>
            setEditedData({ ...editedData, condition: e.target.value })
          }
          placeholder="Condition (required)"
        />
        <input
          type="number"
          className="w-full mb-2 p-2 border rounded"
          value={editedData.price}
          onChange={(e) =>
            setEditedData({ ...editedData, price: Number(e.target.value) })
          }
          placeholder="Price (required)"
          min="0"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setIsEditing(false);
              setPreviewUrl(thumbnail);
              setNewImage(null);
            }}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#7E9181] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow relative">
      <img
        src={thumbnail}
        alt={name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-xl font-bold mb-2">${price}</p>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 bg-[#7E9181] text-white rounded-full hover:bg-[#98A69B]"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProfileItemCard;
