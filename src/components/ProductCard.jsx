import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="w-[200px] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      </Link>
      <div className="p-3 flex flex-col justify-between h-[140px]">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-800 truncate hover:underline">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 font-medium"> ${parseFloat(product.price).toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 bg-sky-500 text-white hover:bg-white hover:text-sky-500 border border-sky-500 text-sm px-3 py-1 rounded transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
