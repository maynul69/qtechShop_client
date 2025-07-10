import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const match = data.find(p => p.id === parseInt(id))
        setProduct(match)
      })
      .catch(err => console.error("Product load error:", err))
  }, [id])

  if (!product) return <p className="p-6">Loading...</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-[400px] h-[300px] object-cover rounded shadow"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-800 mb-4">${parseFloat(product.price).toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-sky-500 text-white hover:bg-white hover:text-sky-500 border border-sky-500 px-5 py-2 rounded text-sm w-fit transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
