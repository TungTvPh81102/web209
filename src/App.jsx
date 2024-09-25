import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/admin/products/ProductList";
import LayoutAdmin from "./layouts/LayoutAdmin";
import ProductAdd from "./components/ProductAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin" element={<ProductList />}></Route>
          <Route path="/admin/product-add" element={<ProductAdd />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
