import Image from "next/image";

const ProductCard = ({ product, onImageClick }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
        <div 
          className="relative w-full h-52 cursor-pointer group"
          onClick={onImageClick} // Jalankan fungsi saat diklik
        >
          <Image 
            src={product.imageUrl} 
            alt={`Gambar produk ${product.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white font-bold">Lihat Gambar</p>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
          {product.price && (
            <p className="text-green-700 font-bold mt-1">{product.price}</p>
          )}
          <p className="text-gray-600 mt-2 text-sm flex-grow whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;