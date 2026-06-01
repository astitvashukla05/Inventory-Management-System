import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

function Login() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

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
      const data =
        await loginUser(
          formData
        );

      localStorage.setItem(
        "token",
        data.access_token
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.detail ||
          "Login failed"
      );
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>Login</h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
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
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
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
          Login
        </button>
        <p>

  Don't have an account?

  <a href="/register">

    Register

  </a>

</p>
      </form>
    </div>
  );
}

export default Login;