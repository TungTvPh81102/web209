import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const ProductAdd = () => {
  const nav = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      const { data } = await api.post("/products", product);
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm sản phẩm thành công",
      });

      nav("/admin");
    },
    onError: (err) => {
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra, vui lòng thử lại " + err,
      });
    },
  });

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

  const onFinish = (values) => {
    mutate({ ...values, imageUrl });
  };

  console.log(imageUrl);

  return (
    <div>
      <h1>Thêm mới sản phẩm</h1>
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
        onFinish={onFinish}
        disabled={isPending}
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
          <Button htmlType="submit">Thêm mới</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
