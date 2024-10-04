import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (item) => {
        return (
          <Image
            src={item}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (_, record) => (
        <Space size="middle">
          <a>
            {record.available ? (
              <Tag color="green">Còn hàng</Tag>
            ) : (
              <Tag color="red">Hết hàng</Tag>
            )}
          </a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <Button color="primary" variant="dashed">
              Edit
            </Button>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              onConfirm={() => mutate(record.id)}
              cancelText="No"
            >
              <Button color="danger" variant="dashed">
                Delete
              </Button>
            </Popconfirm>
          </>
        </Space>
      ),
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xoá sản phẩm thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Làm mới danh sách sản phẩm sau khi xóa
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá sản phẩm thất bại",
      });
    },
  });

  return (
    <>
      {contextHolder}
      <div className="flex">
        <h3 className="font-bold text-xl">Danh sách sản phẩm</h3>
        <Button type="primary" className="ml-auto">
          Thêm mới
        </Button>
      </div>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} className="mt-4" dataSource={data} />
      </Skeleton>
    </>
  );
};
export default DashboardPage;
