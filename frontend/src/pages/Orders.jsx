import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import {
  getOrders,
  createOrder,
  deleteOrder,
} from "../api/orderApi";

import {
  getCustomers,
} from "../api/customerApi";

import {
  getProducts,
} from "../api/productApi";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ordersData =
        await getOrders();

      const customersData =
        await getCustomers();

      const productsData =
        await getProducts();

      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerName = (
    customerId
  ) => {
    const customer =
      customers.find(
        (c) =>
          c.id === customerId
      );

    return customer
      ? customer.full_name
      : "Unknown";
  };

  const getProductName = (
    productId
  ) => {
    const product =
      products.find(
        (p) =>
          p.id === productId
      );

    return product
      ? product.name
      : "Unknown";
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createOrder({
        customer_id: customerId,
        items: [
          {
            product_id:
              productId,
            quantity:
              Number(quantity),
          },
        ],
      });

      setCustomerId("");
      setProductId("");
      setQuantity("");

      await loadData();

      alert(
        "Order created successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.detail ||
          "Failed to create order"
      );
    }
  };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this order?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await deleteOrder(id);

        await loadData();

        alert(
          "Order deleted successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.detail ||
            "Failed to delete order"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            width: "100%",
            padding: "20px",
          }}
        >
          <h1>Orders</h1>

          <hr />

          <h2>Create Order</h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <div>
              <label>
                Customer
              </label>

              <br />

              <select
                value={
                  customerId
                }
                onChange={(e) =>
                  setCustomerId(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map(
                  (
                    customer
                  ) => (
                    <option
                      key={
                        customer.id
                      }
                      value={
                        customer.id
                      }
                    >
                      {
                        customer.full_name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <br />

            <div>
              <label>
                Product
              </label>

              <br />

              <select
                value={
                  productId
                }
                onChange={(e) =>
                  setProductId(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  Select Product
                </option>

                {products.map(
                  (
                    product
                  ) => (
                    <option
                      key={
                        product.id
                      }
                      value={
                        product.id
                      }
                    >
                      {product.name}
                      {" | Stock: "}
                      {
                        product.quantity
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <br />

            <div>
              <label>
                Quantity
              </label>

              <br />

              <input
                type="number"
                min="1"
                value={
                  quantity
                }
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <br />

            <button
              type="submit"
            >
              Create Order
            </button>
          </form>

          <hr />

          <h2>Orders List</h2>

          <table
            border="1"
            cellPadding="10"
            width="100%"
          >
            <thead>
              <tr>
                <th>
                  Customer
                </th>

                <th>
                  Products
                </th>

                <th>
                  Total Amount
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(
                (order) => (
                  <tr
                    key={
                      order.id
                    }
                  >
                    <td>
                      {getCustomerName(
                        order.customer_id
                      )}
                    </td>

                    <td>
                      {order.items?.map(
                        (
                          item
                        ) => (
                          <div
                            key={
                              item.id
                            }
                          >
                            {getProductName(
                              item.product_id
                            )}
                            {" × "}
                            {
                              item.quantity
                            }
                          </div>
                        )
                      )}
                    </td>

                    <td>
                      ₹
                      {
                        order.total_amount
                      }
                    </td>

                    <td>
                      {
                        order.status
                      }
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleDelete(
                            order.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;