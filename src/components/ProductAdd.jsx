import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductAdd = () => {
  const [form] = Form.useForm();
  const [imageUrl, setInputUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  // const nav = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      await api.post(`/products`, product);
    },
    onSuccess: () => {
      form.resetFields();
      messageApi.success("Thêm mới sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // nav("/admin");
    },
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOnChangImage = (value) => {
    if (value.file.status === "done") {
      setInputUrl(value.file.response.secure_url);
    }
  };

  const onFinish = (values) => {
    if (!imageUrl) return;
    mutate({ ...values, imageUrl });
    setInputUrl('')
    form.validateFields('')
  };

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        disabled={isPending}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá",
            },
            {
              type: "number",
              min: 0,
              message: "Giá phải lớn hơn 0",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/dvrexlsgx/image/upload"
            listType="picture-card"
            data={{
              upload_preset: "react-app",
            }}
            onChange={handleOnChangImage}
            // maxCount={1}
            multiple
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
        <Form.Item label="Tình trạng" name="available" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Loại hàng" name="type">
          <Radio.Group>
            <Radio value="1">Hàng cũ</Radio>
            <Radio value="2">Hàng mới</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Danh mục" name="category">
          <Select>
            <Select.Option value="1">Danh mục 1</Select.Option>
            <Select.Option value="2">Danh mục 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button disabled={isPending} type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
