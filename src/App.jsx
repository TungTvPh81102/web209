import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/admin/dashboard/page";
import ProductList from "./pages/admin/products/ProductList";
import ProductDetail from "./pages/admin/products/ProductDetail";
import ProductForm from "./pages/admin/products/ProductForm";

function App() {
  return (
    <main className="container mt-4">
      <Routes>
        <Route path="/admin" element={<DashboardPage />}></Route>
        <Route path="/admin/products" element={<ProductList />}></Route>
        <Route
          path="/admin/products-detail/:id"
          element={<ProductDetail />}
        ></Route>
        <Route path="/admin/product-add" element={<ProductForm />}></Route>
        <Route path="/admin/product-edit/:id" element={<ProductForm />}></Route>
      </Routes>
    </main>
  );
}

export default App;
