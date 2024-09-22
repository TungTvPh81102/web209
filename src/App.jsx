import "./App.css";
import ProductList from "./components/ProductList";
import { Route, Routes } from "react-router-dom";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";

function App() {
  
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/product-add" element={<ProductAdd />}></Route>
        <Route path="/product-edit/:id" element={<ProductEdit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
