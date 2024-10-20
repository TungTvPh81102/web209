import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/axios";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

const ProductEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [product, setProduct] = useState({});
  const [defaultFileList, setDefaultFileList] = useState([]);

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

    if (data?.imageUrl) {
      setDefaultFileList([
        {
          uid: "-1",
          name: data?.imageUrl,
          status: "done",
          url: data?.imageUrl,
        },
      ]);
    }
  }, [data]);

  console.log(defaultFileList);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file?.response?.secure_url);
    }
  };

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

  if (isLoading) return <Spin />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <div>
      <h1>Cập nhật sản phẩm:{id}</h1>
      {contextHolder}
      <Form
        name="add-product"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        className="mt-4"
        initialValues={product}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: (
                <p className="text-red-500 ">Vui lòng nhập tên sản phẩm</p>
              ),
            },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          rules={[
            {
              required: true,
              message: (
                <p className="text-red-500 ">Vui lòng nhập giá sản phẩm</p>
              ),
            },

            {
              type: "number",
              min: 0,
              max: 10000000,
              message: <p className="text-red-500 ">Giá không được âm</p>,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[
            {
              required: true,
              message: <p className="text-red-500 ">Vui lòng chọn danh mục</p>,
            },
          ]}
        >
          <Select>
            <Select.Option value="Danh mục 1">Danh mục 1</Select.Option>
            <Select.Option value="Danh mục 2">Danh mục 2</Select.Option>
            <Select.Option value="Danh mục 3">Danh mục 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="available"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/dvrexlsgx/image/upload"
            listType="picture-card"
            data={{ upload_preset: "react-app" }}
            onChange={onChangeImage}
            defaultFileList={defaultFileList}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;
