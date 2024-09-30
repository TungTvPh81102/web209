import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "./../../../api/axios";
import { Link } from "react-router-dom";
import { message, Popconfirm } from "antd";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      setProducts(data);
      return data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xoá sản phẩm thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá sản phẩm thất bại",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <div>
      {contextHolder}
      <div className="d-flex justify-content-between">
        <h3>Danh sách sản phẩm</h3>
        <Link className="btn btn-primary">Thêm mới</Link>
      </div>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img width={50} src={item.imageUrl} alt="" />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.available ? "Còn hàng" : "Hết hàng"}</td>
              <td>
                <Link
                  to={`/admin/products-detail/${item.id}`}
                  className="btn btn-info"
                >
                  Chi tiết
                </Link>
                <button className="btn btn-warning ms-2">Sửa</button>

                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => mutate(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="btn btn-danger ms-2">Xoá</button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
