import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";
import { getOrders } from "../api/orderApi";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      const customersData = await getCustomers();
      const ordersData = await getOrders();

      setProducts(productsData);
      setCustomers(customersData);
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    }
  };

  const lowStockProducts = products.filter(
    (product) => product.quantity < 10
  );

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + Number(order.total_amount),
    0
  );

  const cardStyle = {
    background: "white",
    borderRadius: "14px",
    padding: "24px",
    minWidth: "220px",
    flex: 1,
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.06)",
    border: "1px solid #e2e8f0",
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
            flex: 1,
            padding: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Inventory overview and business metrics
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Total Products
              </p>

              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                }}
              >
                {products.length}
              </h2>
            </div>

            <div style={cardStyle}>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Total Customers
              </p>

              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                }}
              >
                {customers.length}
              </h2>
            </div>

            <div style={cardStyle}>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Total Orders
              </p>

              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                }}
              >
                {orders.length}
              </h2>
            </div>

            <div style={cardStyle}>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Low Stock Products
              </p>

              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                  color: "#f59e0b",
                }}
              >
                {lowStockProducts.length}
              </h2>
            </div>

            <div style={cardStyle}>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Revenue
              </p>

              <h2
                style={{
                  fontSize: "32px",
                  marginTop: "10px",
                  color: "#10b981",
                }}
              >
                ₹{totalRevenue}
              </h2>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Recent Orders
            </h2>

            <table width="100%">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Items</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map(
                  (order) => (
                    <tr
                      key={order.id}
                    >
                      <td>
                        {order.id.slice(
                          0,
                          8
                        )}
                        ...
                      </td>

                      <td>
                        {order.status}
                      </td>

                      <td>
                        ₹
                        {
                          order.total_amount
                        }
                      </td>

                      <td>
                        {
                          order.items
                            ?.length
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Low Stock Products
            </h2>

            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {lowStockProducts.map(
                  (product) => (
                    <tr
                      key={
                        product.id
                      }
                    >
                      <td>
                        {
                          product.name
                        }
                      </td>

                      <td>
                        {
                          product.sku
                        }
                      </td>

                      <td
                        style={{
                          color:
                            "#ef4444",
                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          product.quantity
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;