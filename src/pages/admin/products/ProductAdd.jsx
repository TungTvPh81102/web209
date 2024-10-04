import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import { message } from "antd";

const ProductAdd = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({});

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const { data } = await api.post("/products", product);
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm sản phẩm thành công",
      });

      setTimeout(() => {
        nav("/admin/products");
      }, 2000);
    },
    onError: (err) => {
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra, vui lòng thử lại " + err,
      });
    },
  });

  const handleOnChange = (e) => {
    e.preventDefault();

    const { name, value, type, checked } = e.target;

    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div>
      <h1>Thêm mới sản phẩm</h1>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Tên sản phẩm"
            onInput={handleOnChange}
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
            onInput={handleOnChange}
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
            onInput={handleOnChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Danh mục</label>
          <select
            onInput={handleOnChange}
            name="category"
            className="form-control"
            id=""
          >
            <option value="">Chọn</option>
            <option value="Danh mục 1">Danh mục 1</option>
            <option value="Danh mục 2">Danh mục 2</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Mô tả</label>
          <textarea
            onInput={handleOnChange}
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
            onInput={handleOnChange}
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

export default ProductAdd;
