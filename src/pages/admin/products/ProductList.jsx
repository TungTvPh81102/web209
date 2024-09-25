/* eslint-disable no-unused-vars */
import {
  Image,
  Space,
  Table,
  Skeleton,
  Button,
  Popconfirm,
  message,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "./../../../api/axios";

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const columns = [
  {
    title: "Ảnh",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (_, record) => <Image width={50} src={record.imageUrl} />,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="https://www.antgroup.com">{text}</a>,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Tình trạng",
    dataIndex: "available",
    key: "available",
    render: (_, record) => {
      return <span>{record.available ? "Còn hàng" : "Hết hàng"}</span>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button color="primary" variant="solid">
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button color="danger" variant="solid">
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const ProductList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.map((product) => ({
        key: product.id,
        ...product,
      }));
    },
  });

  return (
    <>
      <h1 className="font-bold mb-4">Quản lý sản phẩm</h1>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </>
  );
};

export default ProductList;
