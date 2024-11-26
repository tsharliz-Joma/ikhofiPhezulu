import React, { useState } from "react";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "@/forms/loginForm/LoginForm";

// const loginAdminUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/adminLogin";
const adminApiRoute = `http://localhost:1969/api/adminLogin`;

const AdminLogin = () => {
  const { dispatch } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };

    try {
      const response = await axios.post(adminApiRoute, submitData);
      if (response.status === 200) {
        const adminData = response.data;
        sessionStorage.setItem("adminToken", adminData.user);
        dispatch({ type: "LOGIN", payload: adminData });
        navigate("/dashboard");
      } else {
        setShowError(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Coffee up admin</h1>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AdminLogin;
