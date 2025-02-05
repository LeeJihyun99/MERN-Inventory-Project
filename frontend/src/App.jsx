import { Route, Routes } from "react-router-dom";
import ShowProducts from "./pages/ShowProducts";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import DeleteProduct from "./pages/DeleteProduct";
import CreateProduct from "./pages/CreateProduct";
import ShowProduct from "./pages/ShowProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/show" element={<ShowProducts />} />
      <Route path="/products/show/:id" element={<ShowProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/products/delete/:id" element={<DeleteProduct />} />
    </Routes>
  );
};

export default App;
