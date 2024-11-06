import React from "react";
// @ts-ignore
import character from "../../images/character.png";
import Image from "../ImgComponent/ImageComponent";
import "../../App.css";
// Material UI
import {Box, CssBaseline, Typography, Container} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

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
  const {userData} = props;
  const imgStyles = {
    maxWidth: "700px",
    maxHeight: "auto",
  };

  return (
    <>
      <CssBaseline />
      <Container disableGutters>
        <Box sx={{height: "100%"}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}>
            <Image
              style={imgStyles}
              imgSrc={character}
              alt="user-profile-pic"
            />
            <Typography sx={{fontSize: "32px", textAlign: "center"}}>
              {userData.name}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              bottom: "0px",
              display: "flex",
            }}>
            <Button
              fullWidth
              variant="contained"
              sx={{fontSize: {xs: "20px", md: "32px", lg: "25px"}}}>
              Order Coffee{" "}
              <ArrowForwardIosIcon sx={{ml: 1, fontSize: "25px"}} />
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{fontSize: {xs: "20px", md: "32px", lg: "25px"}}}
              onClick={LogoutUser}>
              <ArrowBackIosIcon />
              Sign Out
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserAuthenticatedComponent;
