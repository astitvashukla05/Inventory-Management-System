import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      price: "",
      quantity: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(
          formData.quantity
        ),
      };

      if (editingId) {
        await updateProduct(
          editingId,
          payload
        );
      } else {
        await createProduct(payload);
      }

      resetForm();

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Operation failed"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleDelete = async (
    productId
  ) => {
    const confirmed =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmed) return;

    try {
      await deleteProduct(productId);

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Delete failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            width: "100%",
            padding: "20px",
          }}
        >
          <h1>Products</h1>

          <hr />

          <h2>
            {editingId
              ? "Edit Product"
              : "Create Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <div>
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <div>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={
                  formData.quantity
                }
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <button type="submit">
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingId && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </>
            )}
          </form>

          <hr />

          <h2>Product List</h2>

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse:
                "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product) => (
                  <tr
                    key={product.id}
                  >
                    <td>
                      {product.name}
                    </td>
                    <td>
                      {product.sku}
                    </td>
                    <td>
                      {product.price}
                    </td>
                    <td>
                      {
                        product.quantity
                      }
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            product
                          )
                        }
                      >
                        Edit
                      </button>

                      {" "}

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
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

export default Products;