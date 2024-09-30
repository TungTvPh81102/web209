import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {product ? (
        <>
          <h3>Product Detail: {product.name}</h3>
          <img src={product.imageUrl} alt="" />
          <p>Giá: {product.price}</p>
          <p>Trạng thái: {product.available? "Còn hàng" : "Hết hàng"}</p>
          <p>Danh mục: {product.category}</p>
          <p>Mô tả: {product.description}</p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>Quay lại danh sách</button>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
