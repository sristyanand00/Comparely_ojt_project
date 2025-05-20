// src/components/ProductList.jsx

const ProductList = ({ products }) => {
  if (products.length === 0) return <p className="text-center">No matching products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product._id} className="bg-white p-4 rounded shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Zepto:</strong> ${product.zeptoPrice}</li>
            <li><strong>Blinkit:</strong> ${product.blinkitPrice}</li>
            <li><strong>Instamart:</strong> ${product.instamartPrice}</li>
            <li><strong>BigBasket:</strong> ${product.bigbasketPrice}</li>
            <li><strong>JioMart:</strong> ${product.jiomartPrice}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
