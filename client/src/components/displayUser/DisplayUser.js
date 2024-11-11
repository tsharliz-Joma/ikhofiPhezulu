import LoginForm from "../../Forms/loginForm/LoginForm";
import UserAuthenticatedComponent from "../AuthenticatedUser/AuthenticatedUser";
import { Container, Grid, GridItem } from "../../styles/globals";
import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../Context/ContextProvider";
import { useNavigate } from "react-router";

// const backEndUserLogin = "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/login";
const backEndUserLogin = "http://localhost:1969/api/login";

export const DisplayUser = ({ handleGoogleLogin, handleGoogleError }) => {
  const { value, state, loading, error } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };
    console.log(submitData);

    try {
      const response = await axios.post(backEndUserLogin, submitData);
      // setLoading(true)
      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("token", userData);
        setUser(userData);
        // window.location.reload();
        navigate("/");
      } else {
        alert("Please Check your username and password");
        // setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (value.loading) {
    return <div>Loading...</div>;
  }
  if (value.error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      {state != null ? (
        <UserAuthenticatedComponent userData={value.state.user} />
      ) : (
        <Grid>
          <GridItem>
            <LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} handleGoogleError={handleGoogleError} />
          </GridItem>
        </Grid>
      )}
    </Container>
  );
};
