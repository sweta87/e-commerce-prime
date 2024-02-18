import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import useDelete from "../../../hooks/useDelete";
import toast from "react-hot-toast";

export default function ListOrder() {
  const {
    data: orders,
    loading,
    error,
    refetch
  } = useFetch(`${process.env.REACT_APP_API_URL}/order/all`);

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
          List of Orders
        </span>
      </div>
      <table className="h-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Created At</th>
            {/* <th cl assName="relative px-6 py-3">
              <span className="">Action</span>
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders?.data?.map((order) => (
            <tr key={order._id}>
              <td>{order.userId.email}</td>
              <td>{order.productId.name}</td>
              <td>{order.productId.price}</td>
              <td>{order.quantity}</td>
              <td>
                {parseInt(order.productId.price) * parseInt(order.quantity)}
              </td>
              <td>{order.createdAt}</td>
              {/* <td>
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
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
