import React from "react";

export default function ItemModal({ item, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-lg shadow-lg relative animate-fadeIn">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-900 text-lg"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-contain mb-4"
        />

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {item.title}
        </h2>

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mb-2 capitalize">
          Category: {item.category}
        </p>

        {/* DESCRIPTION */}
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {item.description}
        </p>

        {/* PRICE */}
        <p className="text-2xl font-bold text-purple-600 mb-4">
          ${item.price}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}