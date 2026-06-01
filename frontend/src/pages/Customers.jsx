import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

function Customers() {
  const [customers, setCustomers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      phone: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data =
        await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCustomer(
          editingId,
          formData
        );

        alert(
          "Customer updated successfully"
        );
      } else {
        await createCustomer(
          formData
        );

        alert(
          "Customer created successfully"
        );
      }

      setFormData({
        full_name: "",
        email: "",
        phone: "",
      });

      setEditingId(null);

      loadCustomers();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.detail ||
          "Operation failed"
      );
    }
  };

  const handleEdit = (
    customer
  ) => {
    setEditingId(customer.id);

    setFormData({
      full_name:
        customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this customer?"
      );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      alert(
        "Customer deleted successfully"
      );

      loadCustomers();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete customer"
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
            padding: "20px",
            width: "100%",
          }}
        >
          <h1>Customers</h1>

          <hr />

          <h2>
            {editingId
              ? "Edit Customer"
              : "Create Customer"}
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={
                formData.full_name
              }
              onChange={
                handleChange
              }
            />

            <br />
            <br />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <br />
            <br />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
            />

            <br />
            <br />

            <button
              type="submit"
            >
              {editingId
                ? "Update Customer"
                : "Add Customer"}
            </button>
          </form>

          <hr />

          <h2>
            Customer List
          </h2>

          <table
            border="1"
            cellPadding="10"
            width="100%"
          >
            <thead>
              <tr>
                <th>
                  Full Name
                </th>
                <th>Email</th>
                <th>Phone</th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map(
                (
                  customer
                ) => (
                  <tr
                    key={
                      customer.id
                    }
                  >
                    <td>
                      {
                        customer.full_name
                      }
                    </td>

                    <td>
                      {
                        customer.email
                      }
                    </td>

                    <td>
                      {
                        customer.phone
                      }
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            customer
                          )
                        }
                      >
                        Edit
                      </button>

                      {" "}

                      <button
                        onClick={() =>
                          handleDelete(
                            customer.id
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

export default Customers;