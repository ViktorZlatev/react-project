import React, { useEffect } from "react";

const modalStyles = `
  .im-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.75);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;
    animation: overlayIn .25s ease both;
  }

  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .im-panel {
    position: relative;
    background: #111;
    border: 1px solid rgba(201,169,110,.2);
    border-radius: 2px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.03);
    animation: panelIn .35s cubic-bezier(.16,1,.3,1) both;
    scrollbar-width: none;
  }
  .im-panel::-webkit-scrollbar { display: none; }

  @keyframes panelIn {
    from { opacity: 0; transform: translateY(24px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Top gold accent */
  .im-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 48px; right: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a96e 40%, #e8d5b0 60%, transparent);
    opacity: .7;
    z-index: 2;
  }

  /* Corner marks */
  .im-corner {
    position: absolute;
    width: 10px; height: 10px;
    border-color: rgba(201,169,110,.3);
    border-style: solid;
    z-index: 2;
  }
  .im-tl { top: 9px; left: 9px; border-width: 1px 0 0 1px; }
  .im-tr { top: 9px; right: 9px; border-width: 1px 1px 0 0; }
  .im-bl { bottom: 9px; left: 9px; border-width: 0 0 1px 1px; }
  .im-br { bottom: 9px; right: 9px; border-width: 0 1px 1px 0; }

  /* Close button */
  .im-close {
    position: absolute;
    top: 18px; right: 18px;
    width: 28px; height: 28px;
    border: 1px solid rgba(201,169,110,.18);
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 3;
    transition: border-color .2s, background .2s;
  }
  .im-close:hover {
    border-color: rgba(201,169,110,.5);
    background: rgba(201,169,110,.08);
  }
  .im-close svg {
    width: 10px; height: 10px;
    stroke: rgba(240,236,228,.5);
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    transition: stroke .2s;
  }
  .im-close:hover svg { stroke: #c9a96e; }

  /* Image area */
  .im-img-area {
    width: 100%;
    height: 220px;
    background: rgba(255,255,255,.025);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    border-bottom: 1px solid rgba(201,169,110,.08);
  }

  .im-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,.5));
  }

  /* Content */
  .im-body {
    padding: 28px 32px 32px;
    font-family: 'Outfit', sans-serif;
  }

  .im-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .im-category {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: #c9a96e;
    opacity: .75;
  }

  .im-rating {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .im-stars {
    display: flex;
    gap: 2px;
  }

  .im-star {
    width: 9px; height: 9px;
    background: #c9a96e;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    opacity: .25;
  }
  .im-star.lit { opacity: 1; }

  .im-rating-text {
    font-size: 11px;
    color: rgba(240,236,228,.3);
    font-weight: 300;
  }

  .im-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    color: #f0ece4;
    line-height: 1.25;
    margin-bottom: 16px;
    letter-spacing: -.01em;
  }

  .im-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(201,169,110,.15), transparent);
    margin: 0 0 16px;
  }

  .im-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(240,236,228,.45);
    line-height: 1.7;
    letter-spacing: .02em;
    margin-bottom: 24px;
  }

  .im-price-row {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    margin-bottom: 28px;
  }

  .im-price-label {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: rgba(201,169,110,.45);
    padding-bottom: 4px;
  }

  .im-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #c9a96e;
    line-height: 1;
  }

  .im-price-sym {
    font-size: 18px;
    color: rgba(201,169,110,.5);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    padding-bottom: 4px;
  }

  /* Actions */
  .im-actions {
    display: flex;
    gap: 10px;
  }

  .im-btn-delete {
    flex: 1;
    padding: 13px;
    background: transparent;
    border: 1px solid rgba(220,80,80,.25);
    border-radius: 2px;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(220,80,80,.55);
    cursor: pointer;
    transition: border-color .2s, color .2s, background .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .im-btn-delete:hover {
    border-color: rgba(220,80,80,.6);
    color: #e87070;
    background: rgba(220,80,80,.05);
  }

  .im-btn-delete svg {
    width: 12px; height: 12px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
  }

  .im-btn-close {
    flex: 2;
    padding: 13px;
    background: linear-gradient(135deg, #c9a96e, #a07850);
    border: none;
    border-radius: 2px;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #0a0a0a;
    cursor: pointer;
    transition: opacity .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(201,169,110,.18);
    position: relative;
    overflow: hidden;
  }

  .im-btn-close:hover {
    opacity: .9;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(201,169,110,.28);
  }

  .im-btn-close::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
    transition: left .4s ease;
  }

  .im-btn-close:hover::after { left: 160%; }
`;

export default function ItemModal({ item, onClose, onDelete }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = modalStyles;
    document.head.appendChild(style);

    // Close on Escape
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getStars = (rating) => {
    const filled = Math.round(rating || 0);
    return Array.from({ length: 5 }, (_, i) => i < filled);
  };

  return (
    <div className="im-overlay" onClick={handleOverlayClick}>
      <div className="im-panel">
        <span className="im-corner im-tl" />
        <span className="im-corner im-tr" />
        <span className="im-corner im-bl" />
        <span className="im-corner im-br" />

        <button className="im-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 12 12">
            <line x1="1" y1="1" x2="11" y2="11" />
            <line x1="11" y1="1" x2="1" y2="11" />
          </svg>
        </button>

        <div className="im-img-area">
          <img className="im-img" src={item.image} alt={item.title} />
        </div>

        <div className="im-body">
          <div className="im-meta">
            <span className="im-category">{item.category}</span>
            {item.rating && (
              <div className="im-rating">
                <div className="im-stars">
                  {getStars(item.rating.rate).map((lit, i) => (
                    <div key={i} className={`im-star${lit ? " lit" : ""}`} />
                  ))}
                </div>
                <span className="im-rating-text">{item.rating.rate} · {item.rating.count} reviews</span>
              </div>
            )}
          </div>

          <h2 className="im-title">{item.title}</h2>
          <div className="im-divider" />
          <p className="im-desc">{item.description}</p>

          <div className="im-price-row">
            <span className="im-price-label">Price</span>
            <span className="im-price-sym">$</span>
            <span className="im-price">{item.price}</span>
          </div>

          <div className="im-actions">
            <button className="im-btn-delete" onClick={() => onDelete(item.id)}>
              <svg viewBox="0 0 14 14">
                <polyline points="1,3 13,3" />
                <path d="M4,3V2a1,1 0 0,1 1-1h4a1,1 0 0,1 1,1v1" />
                <path d="M2,3l1,9a1,1 0 0,0 1,1h6a1,1 0 0,0 1-1l1-9" />
              </svg>
              Remove
            </button>
            <button className="im-btn-close" onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}