import React from "react";
import { Grid } from "@mui/material";

const Image = (props) => {
  const { imgSrc } = props;

  const LogoStyles = {
    position: "relative",
    top: "0px",
    maxWidth: "45%",
    height: "auto",
  };

  return (
    <Grid
      container
      // xs={12}
      // xl={12}
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img style={LogoStyles} src={imgSrc} />
    </Grid>
  );
};

export default Image;
