import React, { useEffect, useState } from "react";
import { IProduct } from "./../interface/index";
import { api } from "../api/axios";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState<IProduct>();
  const [data, setData] = useState({});
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    })();
  }, []);

  const handleRemove = async (id: number | string) => {
    try {
      if (confirm("Bạn có muốn xoá sản phẩm ?")) {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((item) => item.id !== id));
        alert("Xoá thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const res = await api.put(`/products/${isEdit.id}`, data);
        const newProducts = products.map((item) => {
          if (item.id === isEdit.id) {
            return res.data;
          } else {
            return item;
          }
        });

        setProducts(newProducts);
        setIsEdit(undefined);

        alert("Cập nhật thành công");
      } else {
        const res = await api.post("/products", data);
        setProducts([...products, res.data]);
        alert("Thêm thành công");
      }
      setData({});
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number | string) => {
    const productEdit = products.find((item) => item.id === id);
    setIsEdit(productEdit);
  };

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-6">
          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Avaribale</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <img
                      className="img-fluid"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.available ? "Còn hàng" : "Hết hàng"}</td>
                  <td>{item.category}</td>
                  <td className="d-flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(item.id)}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="">Tên sản phẩm</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={isEdit?.name}
                onChange={handleOnChange}
                className="form-control"
                placeholder="Tên sản phẩm"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Giá</label>
              <input
                type="text"
                id="price"
                defaultValue={isEdit?.price}
                name="price"
                onChange={handleOnChange}
                className="form-control"
                placeholder="Giá"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Hình ảnh</label>
              <input
                type="text"
                id="imageUrl"
                defaultValue={isEdit?.imageUrl}
                onChange={handleOnChange}
                name="imageUrl"
                className="form-control"
                placeholder="Ảnh"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Danh mục</label>
              <select
                name="category"
                onChange={handleOnChange}
                className="form-control"
              >
                <option value="Danh mục 1">Danh mục 1</option>
                <option value="Danh mục 2">Danh mục 2</option>
                <option value="Danh mục 3">Danh mục 3</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Mô tả</label>
              <textarea
                name="description"
                onChange={handleOnChange}
                placeholder="Mô tả"
                id="description"
                defaultValue={isEdit?.description}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Tình trạng</label>
              <input
                type="checkbox"
                name="available"
                onChange={handleOnChange}
                defaultChecked={isEdit?.available}
                className="form-check"
              />
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary">
                {isEdit ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
