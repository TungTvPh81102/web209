import { useState } from "react";

const ProductForm = () => {
  const [checkBox, setCheckBox] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    console.log(value);
    console.log(name);
  };

  return (
    <div>
      <h1>Thêm mới sản phẩm</h1>
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
        <div className="form-group mb-3 d-flex">
          <label htmlFor="">Tình trạng</label>
          <input
            type="checkbox"
            name="available"
            value="true"
            onChange={(e) => setCheckBox(e.target.checked)}
            className="form-check ms-2"
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
