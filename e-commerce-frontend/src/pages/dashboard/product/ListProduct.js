import { useEffect, useState } from "react";
import MenuButton from "../../../components/MenuButton";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import useDelete from "../../../hooks/useDelete";
import toast from "react-hot-toast";

export default function ListProduct() {
  const {
    data: products,
    loading,
    error,
    refetch
  } = useFetch(`${process.env.REACT_APP_API_URL}/product`);

  const { loading: isDeleting, mutate } = useDelete(
    `${process.env.REACT_APP_API_URL}/product`,
    {
      onSuccess: (res) => {
        refetch();
        toast.success(res?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      }
    }
  );

  const navigate = useNavigate();

  if (loading || isDeleting) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="my-4">
        <span className="mx-8 text-2xl font-bold text-gray-600">
          List of Products
        </span>
      </div>
      <table className="h-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Created At</th>
            <th className="relative px-6 py-3">
              <span className="">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products?.data?.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>{product.createdAt}</td>
              <td>
                <MenuButton
                  links={[
                    {
                      onClick: () => {
                        navigate(`/dashboard/updateProduct/${product._id}`);
                      },
                      label: "Update"
                    },
                    {
                      onClick: () => {
                        mutate(product._id);
                      },
                      label: "Delete"
                    }
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
