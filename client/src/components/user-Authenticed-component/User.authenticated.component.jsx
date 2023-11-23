import React from "react";
// @ts-ignore
import character from "../../images/character.png";
import Image from "../ImgComponent/ImageComponent";
import "../../App.css";
// Material UI
import { Box, CssBaseline, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export const LogoutUser = () => {
  const localUser = localStorage.getItem("token") ? true : false;
  const googleUser = localStorage.getItem("googleToken") ? true : false;
  if (localUser || googleUser) {
    localStorage.removeItem("token");
    localStorage.removeItem("googleToken");
    window.location.reload();
    console.log("Logged out");
  }
};

const UserAuthenticatedComponent = (props) => {
  const { userData } = props;
  const imgStyles = {
    maxWidth: "700px",
    maxHeight: "auto",
    borderRadius: "10%",
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: { xs: "center" },
          paddingTop: { lg: "25%" },
        }}>
        <Grid item xs={12}>
          <Grid item xs={12} lg={10} sx={{ margin: { xs: "100px auto" } }}>
            <Image
              style={imgStyles}
              imgSrc={character}
              alt="user-profile-pic"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={6} sx={{ margin: "0 auto" }}>
            <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
              {userData.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        align="center"
        sx={{
          position: "absolute",
          bottom: "0px",
          padding: "0px 0px 50px 0px",
        }}>
        <Grid item xs={12} sx={{ margin: "0px 0px 0px 0px" }}>
          <Link href="/order-coffee">
            <Button
              variant="contained"
              sx={{ fontSize: { xs: "16px", md: "27px", lg: "25px" } }}>
              Order Coffee{" "}
              <ArrowForwardIosIcon sx={{ ml: 1, fontSize: "25px" }} />
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={2}
          sx={{ margin: "5% 5%", bottom: "0px" }}>
          <Button fullWidth variant="contained" sx={{}} onClick={LogoutUser}>
            <ArrowBackIosIcon />
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAuthenticatedComponent;
