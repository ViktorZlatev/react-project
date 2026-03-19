import React from "react";

export default function ItemModal({ item, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-3/4 max-w-sm shadow-lg relative animate-fadeIn">
        
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 text-base"
        >
          ✕
        </button>

        
        <img
          src={item.image}
          alt={item.title}
          className="h-32 w-full object-contain mb-2"
        />

        
        <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
          {item.title}
        </h2>

        
        <p className="text-xs text-gray-500 mb-1 capitalize">
          Category: {item.category}
        </p>

        
        <p className="mb-2 text-gray-700 dark:text-gray-300 text-sm">
          {item.description}
        </p>

       
        <p className="text-lg font-bold text-purple-600 mb-2">
          ${item.price}
        </p>

       
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-3 py-1 rounded text-sm dark:bg-gray-700 dark:text-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}