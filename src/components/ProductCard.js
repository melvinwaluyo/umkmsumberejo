import Image from "next/image";
const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="relative w-full h-52">
          <Image 
            src={product.imageUrl} 
            alt={`Gambar produk ${product.name}`}
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
          {product.price && (
            <p className="text-green-700 font-bold mt-1">{product.price}</p>
          )}
          <p className="text-gray-600 mt-2 text-sm">
            {product.description}
          </p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;