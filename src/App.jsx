import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/admin/dashboard/page";
import ProductList from "./pages/admin/products/ProductList";
import ProductDetail from "./pages/admin/products/ProductDetail";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <>
      <main className="container mt-4">
        <Routes>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />}></Route>
            <Route path="/admin/products" element={<ProductList />}></Route>
            <Route
              path="/admin/products-detail/:id"
              element={<ProductDetail />}
            ></Route>
            <Route path="/admin/product-add" element={<ProductAdd />}></Route>
            <Route
              path="/admin/product-edit/:id"
              element={<ProductEdit />}
            ></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
