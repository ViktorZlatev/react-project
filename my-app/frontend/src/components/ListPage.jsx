import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemModal from "./ItemModal";
import "./ListPage.css";

export default function ListPage({ onLogout }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => { setItems(res.data); setLoading(false); })
      .catch((err) => { console.error(err); setError("Failed to load items"); setLoading(false); });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Remove this item from the collection?")) {
      setItems(items.filter((item) => item.id !== id));
      setSelectedItem(null);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Sign out of your session?")) onLogout();
  };

  const getStars = (rating) => {
    const filled = Math.round(rating || 0);
    return Array.from({ length: 5 }, (_, i) => i < filled);
  };

  return (
    <div className="lp-root">
      <div className="lp-orb lp-orb-1" />
      <div className="lp-orb lp-orb-2" />

      <div className="lp-inner">
        <header className="lp-header">
          <div className="lp-header-left">
            <p className="lp-eyebrow">Collection</p>
            <h1 className="lp-title">Pro<em>ducts</em></h1>
            {!loading && !error && (
              <p className="lp-count">{items.length} items</p>
            )}
          </div>
          <button className="lp-logout" onClick={handleLogout}>
            <svg className="lp-logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </header>

        {loading && (
          <div className="lp-state">
            <p className="lp-loading-text">Loading collection</p>
            <div className="lp-loading-track">
              <div className="lp-loading-bar" />
            </div>
          </div>
        )}

        {error && (
          <div className="lp-state">
            <p className="lp-error-msg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="lp-grid">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="lp-card"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="lp-card-img-wrap">
                  <img className="lp-card-img" src={item.image} alt={item.title} />
                </div>

                <p className="lp-card-cat">{item.category}</p>
                <h2 className="lp-card-title">{item.title}</h2>

                {item.rating && (
                  <div className="lp-card-rating">
                    <div className="lp-stars">
                      {getStars(item.rating.rate).map((lit, j) => (
                        <div key={j} className={`lp-star${lit ? " lit" : ""}`} />
                      ))}
                    </div>
                    <span className="lp-rating-count">({item.rating.count})</span>
                  </div>
                )}

                <div className="lp-card-footer">
                  <p className="lp-card-price">
                    <span>$</span>{item.price}
                  </p>
                  <div className="lp-card-arrow">
                    <svg viewBox="0 0 12 12">
                      <line x1="2" y1="6" x2="10" y2="6" />
                      <polyline points="7,3 10,6 7,9" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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