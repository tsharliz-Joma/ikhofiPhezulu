import {Grid} from "@mui/material";
import Image from "../ImgComponent/ImageComponent";
import LoginForm from "../../Forms/LoginForm";
import Copyright from "../../App";
import UserAuthenticatedComponent from "../user-Authenticed-component/User.authenticated.component";

export const DisplayUser = ({state, handleGoogleLogin, handleGoogleError}) => {


  // console.log('hey')
  // const {id, email, name, picture} = state;
  // console.log({state});
  return state.state ? (
    <Grid container>
      <UserAuthenticatedComponent userData={state.state} />
    </Grid>
  ) : (
    <Grid
      container
      sx={{
        overflow: "hidden",
        padding: "0px 0px 0px 0px",
        height: "100%",
      }}>
      <Image imgSrc={state.picture} alt="2000s cellphone" />
      <LoginForm onSuccess={handleGoogleLogin} onError={handleGoogleError} />
      <Copyright
        sx={{
          position: "relative",
          bottom: "10px",
          left: "10px",
          fontSize: {xs: "10px", md: "12px", lg: "12px"},
        }}
      />
    </Grid>
  );
};
