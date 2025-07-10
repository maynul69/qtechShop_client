import { Route, Routes } from 'react-router-dom'

import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
