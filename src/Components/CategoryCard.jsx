//CategoryCard.jsx
import React from "react";
import "./CategoryCard.css";
export default function CategoryCard({ title, icon }) {
  return (
    <div className="category-card">
      <div className="icon-wrapper">
        {typeof icon === 'string' && icon.startsWith('http') ? (
          <img src={icon} alt={title} style={{ width: '36px', height: '36px' }} />
        ) : (
          <span className="emoji-icon">{icon}</span>
        )}
      </div>
      <div className="category-title">{title}</div>
    </div>
  );
}







