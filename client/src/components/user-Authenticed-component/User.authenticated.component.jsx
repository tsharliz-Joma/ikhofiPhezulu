import React from "react";
import { Stack, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// @ts-ignore
import img from "../../images/user-1.jpeg";
import '../../App.css'

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
      maxWidth: '200px',
      maxHeight: '200px',
      borderRadius: '10%'
  }

  return (
    <Stack gap={4} className="top col-10 mx-auto userAuthenticated">
      <div className="mx-auto my-4">
        <img style={imgStyles} src={img} />
      </div>
      <div>
        {userName}
      </div>
      <Link
        to="/order-coffee"
        className="btn btn-dark btn-outline-light py-3 ">
        Order Coffee
      </Link>
      <Button
        onClick={LogoutUser}
        className="btn btn-light btn-outline-dark py-3">
        Sign Out
      </Button>
    </Stack>
  );
};

export default UserAuthenticatedComponent;
