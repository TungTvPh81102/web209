import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "./../../../api/axios";
import { Link } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { Button, Form, Input, Radio } from "antd";
const ProductList = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

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
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
        style={{
          maxWidth: formLayout === "inline" ? "none" : 600,
        }}
      >
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value={formLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
      {contextHolder}
      <div className="d-flex justify-content-between">
        <h3>Danh sách sản phẩm</h3>
        <Link to="/admin/product-add" className="btn btn-primary">
          Thêm mới
        </Link>
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
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-warning ms-2"
                >
                  Sửa
                </Link>
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
