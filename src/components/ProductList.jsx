/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

// eslint-disable-next-line react/prop-types
const ProductList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });

  const { mutation, isPending } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isPending) return <p>Deleting...</p>;

  return (
    <div>
      <Link className="btn btn-primary" to="/product-form">
        Thêm
      </Link>
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Avaribale</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img
                  className="img-fluid"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </td>
              <td>{item.available ? "Còn hàng" : "Hết hàng"}</td>
              <td>{item.category}</td>
              <td className="d-flex">
                <Link
                  to={`/product-edit/${item.id}`}
                  type="button"
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => mutation.mutate(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
