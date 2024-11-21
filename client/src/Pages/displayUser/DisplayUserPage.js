import React, { useEffect, useState } from "react";
import UserAuthenticatedComponent from "../../components/AuthenticatedUser/AuthenticatedUser";
import character from "../../images/character.png";
import { useData } from "../../hooks/useData";
import { useUserState } from "../../hooks/useUserState";
import { Container } from "./DisplayUser.styles";
import { CssBaseline, Typography, Link, Button } from "@mui/material";
import { UserContainer, ButtonContainer, Image } from "./DisplayUser.styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const DisplayUserPage = () => {
  const { state } = useData();
  const { user } = state;

  return (
    <Container>
      <CssBaseline />
      <UserContainer>
        <Image src={character} alt={"user-profile-pic"} />
        <Typography sx={{ fontSize: "32px", textAlign: "center" }}>{user.name}</Typography>
      </UserContainer>
      <ButtonContainer>
        <Link href="/order-coffee">
          <Button fullWidth variant="contained">
            Order Coffee
            <ArrowForwardIosIcon sx={{ ml: 1, fontSize: "25px" }} />
          </Button>
        </Link>
        <Button fullWidth variant="contained" onClick={LogoutUser}>
          <ArrowBackIosIcon />
          Sign Out
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export const LogoutUser = () => {
  const localUser = sessionStorage.getItem("token") ? true : false;
  const googleUser = sessionStorage.getItem("googleToken") ? true : false;

  if (localUser || googleUser) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("googleToken");
    window.location.reload();
    console.log("Logged out");
  }
};
