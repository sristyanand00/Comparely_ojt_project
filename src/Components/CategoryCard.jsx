//CategoryCard.jsx
import React from "react";
//import { Link } from "react-router-dom"; // Import Link
import "./CategoryCard.css";
export default function CategoryCard({ title, icon }) {
  const formattedTitle = encodeURIComponent(title); // Encode for URL safety

  return (
    // <Link to={`/category/${formattedTitle}`} className="category-card"> {/* ⬅️ Make card a link */}
    
    <div
      className="category-card"
      onClick={() => onClick(formattedTitle)} // Trigger the onClick handler
      style={{ cursor: "pointer" }}
    >
      <div className="icon-wrapper">
        {typeof icon === 'string' && icon.startsWith('http') ? (
          <img src={icon} alt={title} style={{ width: '36px', height: '36px' }} />
        ) : (
          <span className="emoji-icon">{icon}</span>
        )}
      </div>
      <div className="category-title">{title}</div>
      {/* // </Link> */}
    </div>
  );
}




