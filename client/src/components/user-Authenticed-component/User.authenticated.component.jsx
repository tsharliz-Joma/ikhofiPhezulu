import React from "react";
// @ts-ignore
import character from "../../images/character.png";
import Image from "../Imag∑/ImageComponent";
import "../../App.css";
// Material UI
import { CssBaseline, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";


const LogoutUser = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location.reload();
    console.log("Logged out");
  }
};

const UserAuthenticatedComponent = (props) => {
  const { userName } = props;

  const imgStyles = {
    maxWidth: "200px",
    maxHeight: "200px",
    borderRadius: "10%",
  };

  return (
    <Grid container spacing={2} align="center">
      <CssBaseline/>
      <Grid item xs={12}>
        <Image style={imgStyles} imgSrc={character} alt="user-profile-pic"/>
      </Grid>
      <Grid item xs={6}>
        <Typography>{userName}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Link href="/order-coffee">Order Coffee</Link>
      </Grid>
      <Grid item xs={10} md={6} lg={2} sx={{ margin: "0 auto" }}>
        <Button variant="contained" sx={{ width: "100%" }} onClick={LogoutUser}>
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserAuthenticatedComponent;
