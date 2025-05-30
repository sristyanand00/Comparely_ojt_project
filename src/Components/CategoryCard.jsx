//CategoryCard.jsx
import React from "react";
import "./CategoryCard.css";
export default function CategoryCard({ title, image }) {
  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-img" />
      <div className="category-title">{title}</div>
    </div>
  );
}







