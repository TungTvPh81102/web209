import React, { useState } from "react";
import { api } from "./../api/axios";
import { IProduct } from "../interface";

const ProductForm = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [product, setProduct] = useState<IProduct[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameInput = e.target.name.value;
    const priceInput = e.target.price.value;
    const imageUrl = e.target.imageUrl.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const available = checkBox;

    const data = {
      name: nameInput,
      price: priceInput,
      imageUrl: imageUrl,
      category: category,
      description: description,
      available: available,
    };

    try {
      const res = await api.post("/products", data);
      setProduct(res.data);
      window.location.reload();
      alert("Thêm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Tên sản phẩm"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Giá</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            placeholder="Giá"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Hình ảnh</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            placeholder="Ảnh"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Danh mục</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            placeholder="Danh mục"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Mô tả</label>
          <textarea
            name="description"
            placeholder="Mô tả"
            id="description"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Tình trạng</label>
          <input
            type="checkbox"
            name="available"
            value="true"
            onChange={(e) => setCheckBox(e.target.checked)}
            className="form-check"
          />
        </div>
        <div className="form-group mb-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
