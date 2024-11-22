import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container, UserContainer, ButtonContainer, Image } from "./DisplayUser.styles";
import { useData } from "../../hooks/useData";

export const DisplayUserPage = () => {
  const { state } = useData();
  const { user } = state;

  return (
    <Container>
      <CssBaseline />
      <UserContainer>
        {/* <Image src={character} alt={"user-profile-pic"} /> */}
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
