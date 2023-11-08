import React from "react";
// @ts-ignore
import character from "../../images/character.png";
import Image from "../Imag∑/ImageComponent";
import "../../App.css";
// Material UI
import { Box, CssBaseline, Typography} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";


export const LogoutUser = () => {
  const localUser = localStorage.getItem("token") ? true : false
  const googleUser = localStorage.getItem("googleToken") ? true : false
  if (localUser || googleUser) {
    localStorage.removeItem("token")
    localStorage.removeItem("googleToken")
    window.location.reload();
    console.log("Logged out");
  }
};

const UserAuthenticatedComponent = (props) => {
  const { userData } = props;
  const imgStyles = {
    maxWidth: "200px",
    maxHeight: "200px",
    borderRadius: "10%",
  };

  return (
    <>
      <Box>
        <Grid container sx={{ justifyContent: 'center'}}>
          <Grid item xs={12} sx={{ paddingTop: "50px"}}>
            <Image
              style={imgStyles}
              imgSrc={character}
              alt="user-profile-pic"
            />
            {userData.name}
          </Grid>
          <Grid item xs={12} >
            {/* <Typography textAlign={'center'}>{userName}</Typography> */}
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        spacing={2}
        align="center"
        sx={{ position: "absolute", bottom: "20%" }}>
        <CssBaseline />

        <Grid item xs={12} sx={{ mb: 5, alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/order-coffee">
            <Button variant="contained" sx={{ fontSize: "16px" }}>
              Order Coffee <ArrowForwardIosIcon sx={{ ml: 1, fontSize: '25px' }} />
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          lg={2}
          sx={{ position: "absolute", marginLeft: "5%", bottom: "-150%" }}>
          <Button
          fullWidth
            variant="contained"
            sx={{ width: "100%" }}
            onClick={LogoutUser}>
            <ArrowBackIosIcon />
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAuthenticatedComponent;
