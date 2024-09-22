import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const ProductEdit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [dataEdit, setData] = useState({});

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return await api.get(`/products/${id}`);
    },
  });

  useEffect(() => {
    if (data) {
      setData(data?.data);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      return await api.put(`/products/${id}`, product);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["products"] });
      nav("/");
    },
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setData({ ...dataEdit, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(dataEdit);
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
            value={dataEdit?.name || ""}
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
            value={dataEdit?.price || ""}
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
            value={dataEdit?.imageUrl  || ""}
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
            value={dataEdit.category || ""}
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
            value={dataEdit?.description || ""}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Tình trạng</label>
          <input
            type="checkbox"
            name="available"
            onChange={handleOnChange}
            checked={dataEdit?.available || ""}
            className="form-check"
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">
            {dataEdit ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
