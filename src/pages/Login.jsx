import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { api } from "../api/axios";

const Login = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({});

  const { mutate } = useMutation({
    mutationFn: async (auth) => {
      const { data } = await api.post("/login", auth);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("auth", JSON.stringify(data));
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Đăng đăng nhập thành công",
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

    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      {contextHolder}
      <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
