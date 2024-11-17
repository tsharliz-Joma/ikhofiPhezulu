import React, { useEffect, useState } from "react";
import UserAuthenticatedComponent from "../../components/AuthenticatedUser/AuthenticatedUser";
import { useData } from "../../hooks/useData";
import { useUserState } from "../../hooks/useUserState";
import { Container } from "./DisplayUser.styles";

export const DisplayUserPage = () => {
  const { state } = useData();

  return (
    <Container>
      <UserAuthenticatedComponent user={state.user} />
    </Container>
  );
};
