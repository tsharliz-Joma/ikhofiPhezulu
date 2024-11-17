import LoginForm from "../../Forms/loginForm/LoginForm";
import { Container, Grid, GridItem } from "../../styles/globals";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useData } from "../../hooks/useData";

// const backEndUserLogin = "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/login";
const backEndUserLogin = "http://localhost:1969/api/login";

const LoginPage = ({ handleGoogleLogin, handleGoogleError }) => {
  const { state, dispatch } = useData();
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
    try {
      const response = await axios.post(backEndUserLogin, submitData);
      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("token", userData.user);
        dispatch({ type: "LOGIN", payload: userData });
        navigate("/order-coffee");
      } else {
        alert("Please Check your username and password");
        setShowError(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Grid>
        <GridItem>
          <LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} handleGoogleError={handleGoogleError} />
        </GridItem>
      </Grid>
    </Container>
  );
};
export default LoginPage;
