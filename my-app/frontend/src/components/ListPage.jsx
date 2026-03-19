import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemModal from "./ItemModal";

export default function ListPage({ onLogout }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load items");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete?")) {
      setItems(items.filter((item) => item.id !== id));
      setSelectedItem(null);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Products
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      
      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
          Loading products...
        </p>
      )}

     
      {error && (
        <p className="text-center text-red-500 font-semibold text-sm">{error}</p>
      )}

      
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:cursor-pointer hover:ring-2 hover:ring-purple-500 transition"
            >
            
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-full object-contain mb-2"
              />

              
              <h2 className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100 line-clamp-2">
                {item.title}
              </h2>

              
              <p className="text-purple-600 font-semibold text-sm">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      )}

     
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}