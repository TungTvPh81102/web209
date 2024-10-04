import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/axios";
import { message, Spin } from "antd";

const ProductEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [product, setProduct] = useState({});

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  console.log(product);

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const { data } = await api.put(`/products/${id}`, product);
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công",
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

    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(product);
  };

  if (isLoading) return <Spin />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <div>
      <h1>Cập nhật sản phẩm:{id}</h1>
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
            value={product?.name || ""}
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
            value={product?.price || ""}
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
            value={product?.imageUrl || ""}
            onInput={handleOnChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Danh mục</label>
          <select
            value={product?.category || ""}
            onInput={handleOnChange}
            name="category"
            className="form-control"
            id=""
          >
            <option value="">Chọn</option>
            <option value="Danh mục 1">Danh mục 1</option>
            <option value="Danh mục 2">Danh mục 2</option>
            <option value="Danh mục 3">Danh mục 3</option>
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
            value={product?.description || ""}
          ></textarea>
        </div>
        <div className="form-group mb-3 d-flex">
          <label htmlFor="">Tình trạng</label>
          <input
            type="checkbox"
            name="available"
            value="true"
            defaultChecked={product?.available}
            onInput={handleOnChange}
            className="form-check ms-2"
          />
        </div>
        <div className="form-group mb-3">
          <button className="btn btn-primary">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
