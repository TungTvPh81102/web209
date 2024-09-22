import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const ProductAdd = () => {
  const nav = useNavigate();
  const [data, setData] = useState({});
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await api.post(`/products`, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      nav("/");
    },
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      mutate(data);
      alert("Thêm thành công");
      e.target.reset();
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
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Tình trạng</label>
          <input
            type="checkbox"
            name="available"
            onChange={handleOnChange}
            className="form-check"
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
