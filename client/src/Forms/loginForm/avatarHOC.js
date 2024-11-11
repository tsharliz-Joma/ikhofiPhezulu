import React from "react";

export const avatarHOC = (Component) => {
  return (props) => {

    return <Component {...props} />;
  };
};

