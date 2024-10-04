import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { api } from "../api/axios";

const Register = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({});

  const { mutate } = useMutation({
    mutationFn: async (auth) => {
      const { data } = await api.post("/register", auth);
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công",
      });

      setTimeout(() => {
        nav("/login");
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

    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div>
      <h1>Đăng ký</h1>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="">Tên khách hàng</label>
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
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onInput={handleOnChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mật khẩu"
            onInput={handleOnChange}
          />
        </div>
        <div className="form-group mb-3">
          <button className="btn btn-primary">Đăng ký</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
