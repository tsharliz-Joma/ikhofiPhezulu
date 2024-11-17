import React from "react";
// @ts-ignore
import character from "../../images/character.png";
import "../../App.css";
// Material UI
import { CssBaseline, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { ButtonContainer, Container, UserContainer, Image } from "./AuthenticatedUser.styles";

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

const UserAuthenticatedComponent = ({ user }) => {
  return (
    <>
      <CssBaseline />
      <Container>
        <UserContainer>
          <Image src={character} alt={"user-profile-pic"} />
          <Typography sx={{ fontSize: "32px", textAlign: "center" }}>{user.user.name}</Typography>
        </UserContainer>
        <ButtonContainer>
          <Button fullWidth variant="contained" sx={{ fontSize: { xs: "20px", md: "32px", lg: "25px" } }}>
            Order Coffee <ArrowForwardIosIcon sx={{ ml: 1, fontSize: "25px" }} />
          </Button>
          <Button fullWidth variant="contained" sx={{ fontSize: { xs: "20px", md: "32px", lg: "25px" } }} onClick={LogoutUser}>
            <ArrowBackIosIcon />
            Sign Out
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default UserAuthenticatedComponent;
