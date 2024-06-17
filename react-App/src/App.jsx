import './App.css'
import CreateProduct from './pages/create-product/CreateProduct'
import NotFound from './pages/not-found/NotFound'
import Products from './pages/products/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateProduct from './pages/update-product/UpdateProduct'
import ShowProduct from './pages/show-product/ShowProduct'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Products/>}/>
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/show/:id" element={<ShowProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
